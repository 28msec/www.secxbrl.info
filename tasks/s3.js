'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var _ = require('lodash');
var Q = require('q');
var AWS = require('aws-sdk');
var awspublish = require('gulp-awspublish');
var parallelize = require("concurrent-transform");
var minimist = require('minimist');

var knownOptions = {
    string: 'build-id',
    default: { 'build-id': process.env.RANDOM_ID }
};

var Config = require('./config');

//var headers = {};

var s3, key, secret, region, bucketName, config, publisher, buildId;

var init = function() {
    buildId = minimist(process.argv.slice(2), knownOptions)['build-id'];
    key = Config.isOnProduction ?  Config.credentials.s3.prod.key : Config.credentials.s3.dev.key;
    secret = Config.isOnProduction ?  Config.credentials.s3.prod.secret : Config.credentials.s3.dev.secret;
    region = Config.credentials.s3.region;
    bucketName = Config.isOnProduction ? 'disclosures.secxbrl.info' : 'secdisclosures-' + buildId;
    $.util.log('Bucket Name: ' + bucketName);
    config = {
        accessKeyId: key,
        secretAccessKey: secret,
        region: region,
        bucket: bucketName
    };
    publisher = awspublish.create({
        key: key,
        secret: secret,
        bucket: bucketName
    });
    s3 = new AWS.S3(config);
};

var makeBucketWebsite = function() {
    var defered = Q.defer();
    s3.putBucketWebsite(
        {
            Bucket : bucketName,
            WebsiteConfiguration : Config.credentials.s3.website
        }, function(err) {
            if (err) {
                $.util.log('putBucketWebsite(' + bucketName + '): ' + err);
                defered.reject();
            }
            else {
                $.util.log('putBucketWebsite(' + bucketName + ')');
                $.util.log('Website available at http://' + bucketName + '.s3-website-' + region + '.amazonaws.com/');
                defered.resolve();
            }
        }
    );
    return defered.promise;
};

// Will list *all* the content of the bucket given in options
// Recursively requests the bucket with a marker if there's more than
// 1000 objects. Ensures uniqueness of keys in the returned list.
var listObjects = function (idempotent, prefix, marker, contents) {
    var defered = Q.defer();

    var search = {
        Prefix: prefix,
        Bucket: bucketName
    };

    if (marker) {
        search.Marker = marker;
    }

    s3.listObjects(search, function (err, list) {
        if (!err) {
            var objects = (contents) ? contents.concat(list.Contents) : list.Contents;

            if (list.IsTruncated) {
                var new_marker = _.last(list.Contents).Key;
                listObjects(idempotent, prefix, new_marker, objects);
            } else {
                defered.resolve(_.uniq(objects, function (o) { return o.Key; }));
            }
        } else {
            if(idempotent) {
                defered.resolve();
            } else {
                defered.reject(new Error('Failed to list content of bucket ' + bucketName + '\n' + err));
            }
        }
    });
    return defered.promise;
};

var createBucket = function() {
    var defered = Q.defer();
    s3.createBucket({
        Bucket : bucketName,
        ACL : 'public-read'
    }, function(err, data) {
        if (err || data === null) {
            $.util.log(bucketName + err);
            defered.reject();
        } else {
            $.util.log('createBucket(' + bucketName + ')');
            defered.resolve();
        }
    });
    return defered.promise;
};

var deleteBucket = function(idempotent) {
    return listObjects(idempotent)
        .then(function(list){
            $.util.log('listObjects(' + bucketName + ')');
            if(list && list.length > 0) {
                var deleteList = [];
                list.forEach(function(object){
                    deleteList.push({
                        Key: object.Key,
                        VersionId: object.VersionId
                    });
                });
                var defered = Q.defer();
                s3.deleteObjects({
                    Bucket: bucketName,
                    Delete: {
                        Objects: deleteList
                    }
                }, function(err, data){
                    if (err || data === null) {
                        $.util.log('deleteObjects(' + bucketName + '): ' + err);
                        defered.reject();
                    } else {
                        $.util.log('deleteObjects(' + bucketName + ')');
                        defered.resolve();
                    }
                });
                return defered.promise;
            }
        })
        .fin(function(){
            var defered = Q.defer();
            s3.deleteBucket({
                Bucket : bucketName
            }, function(err, data) {
                if ((err || data === null) && !idempotent) {
                    $.util.log('deleteBucket(' + bucketName + '): ' + err);
                    defered.reject();
                } else {
                    $.util.log('deleteBucket(' + bucketName + ')');
                    defered.resolve();
                }
            });
            return defered.promise;
        });
};

gulp.task('s3-setup', function() {
    var idempotent = true;
    init();
    if(!Config.isOnProduction) {
        return deleteBucket(idempotent)
        .then(createBucket)
        .then(makeBucketWebsite)
        .then(function(){
            return gulp.src('dist/**/*')
                    .pipe(awspublish.gzip())
                    .pipe(parallelize(publisher.publish(), 10))
                    .pipe(awspublish.reporter());
        })
        .catch(function(error){
            $.util.log('Error while doing the s3 setup');
            $.util.log(error);
        });
    } else {
        return gulp.src('dist/**/*')
            .pipe(awspublish.gzip())
            .pipe(parallelize(publisher.publish(), 10))
            .pipe(awspublish.reporter());
    }
});

gulp.task('s3-teardown', function(done) {
    init();
    if(!Config.isOnProduction) {
        deleteBucket().then(function(){
            done();
        })
        .catch(function(error){
            $.util.log('Error while doing the s3 setup');
            $.util.log(error);
        });
    } else {
        $.util.log('We are on master, no teardown.');
        done();
    }
});
