define(['intranet', 'backbone', 'hoist'], function(Intranet, Backbone, hoist) {
    'use strict';

    Intranet.shadeColor = function(color, percent) {
        var R = parseInt(color.substring(1, 3), 16);
        var G = parseInt(color.substring(3, 5), 16);
        var B = parseInt(color.substring(5, 7), 16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;

        var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
        var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
        var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

        return "#" + RR + GG + BB;
    };

    Intranet.drawGraph = function(ctx, percent, colour) {
        do {
            ctx.beginPath();
            ctx.arc(100, 100, 80, Math.PI * 3 / 2 + 2 * Math.PI * percent, Math.PI * 3 / 2, true);
            ctx.arc(100, 100, 100, Math.PI * 3 / 2, Math.PI * 3 / 2 + 2 * Math.PI * percent);
            ctx.fillStyle = colour;
            ctx.fill();
            colour = Intranet.shadeColor(colour, -40);
            percent -= 1;
        } while (percent > 0);
    };

    Intranet.GraphDataView = Backbone.View.extend({
        tagName: "p",
        className: "textSC",
        template: _.template($("#graphDataTemplate").html()),

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    Intranet.GraphDataListView = Backbone.View.extend({
        render: function() {
            var that = this;
            _.each(this.collection.models, function(item) {
                that.renderGraphData(item);
            }, this);
            this.renderGraph();
        },

        renderGraphData: function(item) {
            var graphDataView = new Intranet.GraphDataView({
                model: item
            });
            this.$el.append(graphDataView.render().el);
        },
    });

    Intranet.BudgetView = Intranet.GraphDataListView.extend({
        el: "#budget",

        initialize: function() {
            this.collection = Intranet.collections.budgetList;
            this.render();
        },

        renderGraph: function() {
            var c = document.getElementById("budget_canvas");
            var ctx = c.getContext("2d");
            var target = this.collection.models[0].get("data");
            var actual = this.collection.models[1].get("data");
            target = parseFloat(target.substring(1, target.length));
            actual = parseFloat(actual.substring(1, actual.length));
            var percent = actual / target;
            var colour = "#80C99C";
            Intranet.drawGraph(ctx, percent, colour);
        }
    });

    Intranet.InvestmentView = Intranet.GraphDataListView.extend({
        el: "#investment",

        initialize: function() {
            this.collection = Intranet.collections.investmentList;
            this.render();
            this.renderGraph();
        },

        renderGraph: function() {
            var c = document.getElementById("investment_canvas");
            var ctx = c.getContext("2d");
            ctx.beginPath();
            var target = this.collection.models[1].get("data");
            var actual = this.collection.models[0].get("data");
            target = parseFloat(target.substring(0, target.length - 1));
            actual = parseFloat(actual.substring(0, actual.length - 1));
            var percent = actual / target;
            var colour = "#D82253";
            Intranet.drawGraph(ctx, percent, colour);
        }

    });

    Intranet.TeamSatisfactionView = Intranet.GraphDataListView.extend({
        el: "#team_satisfaction",

        initialize: function() {
            this.collection = Intranet.collections.teamSatisfactionList;
            this.render();
            this.renderGraph();
        },

        renderGraph: function() {
            var c = document.getElementById("team_satisfaction_canvas");
            var ctx = c.getContext("2d");
            var target = this.collection.models[0].get("data");
            var actual = this.collection.models[1].get("data");
            target = parseFloat(target.substring(0, target.length - 1));
            actual = parseFloat(actual.substring(0, actual.length - 1));
            var percent = actual / target;
            var colour = "#666666";
            Intranet.drawGraph(ctx, percent, colour);
        }
    });

    Intranet.DeadlineView = Backbone.View.extend({
        tagName: "div",
        template: $("#deadlineTemplate").html(),

        render: function() {
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        }
    });

    Intranet.DeadlineListView = Backbone.View.extend({
        el: "#deadlines",

        initialize: function() {
            this.collection = Intranet.collections.deadlineList;
            this.render();
        },

        render: function() {
            var that = this;
            _.each(this.collection.models, function(item) {
                that.renderDeadline(item);
            }, this);
        },

        renderDeadline: function(item) {
            var deadlineView = new Intranet.DeadlineView({
                model: item
            });
            this.$el.append(deadlineView.render().el);
        }
    });

    Intranet.NewsView = Backbone.View.extend({
        tagName: "div",
        template: $("#newsTemplate").html(),

        render: function() {
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        }
    });

    Intranet.NewsListView = Backbone.View.extend({
        el: "#news_feed",

        initialize: function() {
            this.collection = Intranet.collections.newsList;
            this.render();
        },

        render: function() {
            var that = this;
            _.each(this.collection.models, function(item) {
                that.renderNews(item);
            }, this);
        },

        renderNews: function(item) {
            var newsView = new Intranet.NewsView({
                model: item
            });
            this.$el.append(newsView.render().el);
        }
    });

    Intranet.LinkView = Backbone.View.extend({
        tagName: "div",
        template: $("#linkTemplate").html(),

        render: function() {
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        }
    });

    Intranet.LinkListView = Backbone.View.extend({
        el: "#useful_links",

        initialize: function() {
            this.collection = Intranet.collections.linkList;
            this.render();
        },

        render: function() {
            var that = this;
            _.each(this.collection.models, function(item) {
                that.renderLink(item);
            }, this);
        },

        renderLink: function(item) {
            var linkView = new Intranet.LinkView({
                model: item
            });
            this.$el.append(linkView.render().el);
        }
    });



    Intranet.ProductView = Backbone.View.extend({
        tagName: "div",
        template: $("#productTemplate").html(),

        render: function() {
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        }
    });

    Intranet.ProductListView = Backbone.View.extend({
        render: function() {
            var that = this;
            _.each(this.collection.models, function(item) {
                that.renderProduct(item);
            }, this);
        },

        renderProduct: function(item) {
            var productView = new Intranet.ProductView({
                model: item
            });
            this.$el.append(productView.render().el);
        }
    });

    Intranet.StartUpListView = Intranet.ProductListView.extend({
        el: "#start_up",

        initialize: function() {
            this.collection = Intranet.collections.startUpList;
            this.render();
        },
    });

    Intranet.OperationalListView = Intranet.ProductListView.extend({
        el: "#operational",

        initialize: function() {
            this.collection = Intranet.collections.operationalList;
            this.render();
        },
    });

    Intranet.PassiveListView = Intranet.ProductListView.extend({
        el: "#passive",

        initialize: function() {
            this.collection = Intranet.collections.passiveList;
            this.render();
        },
    });

    Intranet.EndGameIntranetView = Backbone.View.extend({
        initialize: function() {
            Intranet.collections = new Intranet.Collections();
            Intranet.collections.fetchCollections(Intranet.jsonData);
            this.render();
        },

        render: function() {
            var bugetView = new Intranet.BudgetView();
            var investmentView = new Intranet.InvestmentView();
            var teamSatisfactionView = new Intranet.TeamSatisfactionView();
            var deadlineListView = new Intranet.DeadlineListView();
            var newsListView = new Intranet.NewsListView();
            var linkListView = new Intranet.LinkListView();
            var startUpListView = new Intranet.StartUpListView();
            var operationalListView = new Intranet.OperationalListView();
            var passiveListView = new Intranet.PassiveListView();
            return this;
        }
    });

    Intranet.View = Backbone.View.extend({

        initialize: function() {
            if (!this.$el.hasClass('modal')) {
                $('section').hide();
            }

            this.$el.show();
        },
    });

    Intranet.Login = Intranet.View.extend({

        events: {
            'click .login a': 'login',
            'click .signup a': 'signup'
        },

        el: '#Login',

        login: function() {
            hoist.login(this.$('#EmailAddress').val(), this.$('#Password').val(), function() {
                console.log("login successful");
                hoist.getData(function(data) {
                    $('section').hide();
                    Intranet.jsonData = data;
                    new Intranet.EndGameIntranetView();
                }, function() {
                    console.log("data get unsuccessful");
                });
            }, function() {
                console.log("login unsuccessful");
            });
            return false;

        },
        signup: function() {
            new Intranet.SignUp();
        }

    });

    Intranet.SignUp = Intranet.View.extend({
        events: {
            'click .signup a': 'signup'
        },

        el: '#SignUp',

        signup: function() {
            hoist.signup(this.$('#Name').val(), this.$('#EmailAddress').val(), this.$('#Password').val(), function() {
                console.log("signup successful");
                hoist.getData(function(data) {
                    $('section').hide();
                    Intranet.jsonData = data;
                    new Intranet.EndGameIntranetView();
                }, function() {
                    console.log("data get unsuccessful");
                });
            }, function() {
                console.log("signup unsuccessful");
            });
            return false;
        }
    });

    return Intranet;
});