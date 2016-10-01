'use strict';

System.register('wiwatSrt/bestAnswer/addBestAnswerAction', ['flarum/extend', 'flarum/app', 'flarum/components/Button', 'flarum/components/CommentPost'], function (_export, _context) {
    "use strict";

    var extend, app, Button, CommentPost;

    _export('default', function () {
        extend(CommentPost.prototype, 'actionItems', function (items) {

            var post = this.props.post;
            if (post.isHidden() || post.attribute('number') == 1) return;

            var discussion = this.props.post.discussion();
            var isBestAnswer = post.attribute('isBestAnswer');

            items.add('bestAnswer', Button.component({
                children: app.translator.trans(isBestAnswer ? 'flarum-best-answer.forum.remove_best_answer' : 'flarum-best-answer.forum.this_best_answer'),
                className: 'Button Button--link',
                onclick: function onclick() {
                    isBestAnswer = !isBestAnswer;
                    post.save({isBestAnswer: isBestAnswer});
                    discussion.pushAttributes({isBestAnswer: isBestAnswer});
                }
            }));
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumComponentsCommentPost) {
            CommentPost = _flarumComponentsCommentPost.default;
        }],
        execute: function () {
        }
    };
});
'use strict';

System.register('wiwatSrt/bestAnswer/addBestAnswerAttribute', ['flarum/extend', 'flarum/app', 'flarum/components/Post', 'flarum/components/CommentPost'], function (_export, _context) {
    "use strict";

    var extend, app, PostComponent, CommentPost;

    _export('default', function () {
        extend(CommentPost.prototype, 'headerItems', function (items) {
            if (this.props.post.attribute('isBestAnswer')) {
                items.add('isBestAnswer', app.translator.trans('flarum-best-answer.forum.header_best_answer'));
            }
        });

        extend(PostComponent.prototype, 'attrs', function (attrs) {
            if (this.props.post.attribute('isBestAnswer')) {
                attrs.className += ' Post--best-answer';
            }
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsPost) {
            PostComponent = _flarumComponentsPost.default;
        }, function (_flarumComponentsCommentPost) {
            CommentPost = _flarumComponentsCommentPost.default;
        }],
        execute: function () {
        }
    };
});
'use strict';

System.register('wiwatSrt/bestAnswer/addBadgeBestAnswer', ['flarum/extend', 'flarum/app', 'flarum/models/Discussion', 'flarum/components/Badge'], function (_export, _context) {
    "use strict";

    var extend, app, Discussion, Badge;
    _export('default', function () {
        extend(Discussion.prototype, 'badges', function (items) {
            if (this.attribute('isBestAnswer') && !items.has('hidden')) {
                items.add('bestAnswer', m(Badge, { type: 'bestAnswer', icon: 'check', label: app.translator.trans('flarum-best-answer.forum.best_answer') }));
            }
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumModelsDiscussion) {
            Discussion = _flarumModelsDiscussion.default;
        }, function (_flarumComponentsBadge) {
            Badge = _flarumComponentsBadge.default;
        }],
        execute: function () {
        }
    };
});
'use strict';

System.register('wiwatSrt/bestAnswer/main', ['flarum/app', 'flarum/extend', 'wiwatSrt/bestAnswer/addBestAnswerAction', 'wiwatSrt/bestAnswer/addBestAnswerAttribute', 'wiwatSrt/bestAnswer/addBadgeBestAnswer'], function (_export, _context) {
    "use strict";

    var app, extend, addBestAnswerAction, addBestAnswerAttribute, addBadgeBestAnswer;

    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_wiwatSrtBestAnswerAddBestAnswerAction) {
            addBestAnswerAction = _wiwatSrtBestAnswerAddBestAnswerAction.default;
        }, function (_wiwatSrtBestAnswerAddBestAnswerAttribute) {
            addBestAnswerAttribute = _wiwatSrtBestAnswerAddBestAnswerAttribute.default;
        }, function (_wiwatSrtBestAnswerAddBadgeBestAnswer) {
            addBadgeBestAnswer = _wiwatSrtBestAnswerAddBadgeBestAnswer.default;
        }],

        execute: function () {
            app.initializers.add('wiwatSrt-bestAnswer', function () {
                addBadgeBestAnswer();
                addBestAnswerAttribute();
                addBestAnswerAction();
            });
        }
    };
});