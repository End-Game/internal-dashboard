$(function() {
    function shadeColor(color, percent) {
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
    }

    function drawGraph(ctx, percent, colour) {
        do {
            ctx.beginPath();
            ctx.arc(100, 100, 80, Math.PI * 3 / 2 + 2 * Math.PI * percent, Math.PI * 3 / 2, true);
            ctx.arc(100, 100, 100, Math.PI * 3 / 2, Math.PI * 3 / 2 + 2 * Math.PI * percent);
            ctx.fillStyle = colour;
            ctx.fill();
            colour = shadeColor(colour, -40);
            percent -= 1;
        } while (percent > 0);
    }

    var GraphData = Backbone.Model.extend({
        defaults: {
            dataTitle: "",
            data: ""
        }
    });

    var GraphDataList = Backbone.Collection.extend({
        model: GraphData
    });

    var GraphDataView = Backbone.View.extend({
        tagName: "p",
        className: "textSC",
        template: _.template($("#graphDataTemplate").html()),

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var BudgetView = Backbone.View.extend({
        el: "#budget",

        initialize: function() {
            this.collection = collections.budgetList;
            this.render();
        },

        render: function() {
            var that = this;
            _.each(this.collection.models, function(item) {
                that.renderGraphData(item);
            }, this);
            this.renderGraph();
        },

        renderGraphData: function(item) {
            var graphDataView = new GraphDataView({
                model: item
            });
            this.$el.append(graphDataView.render().el);
        },

        renderGraph: function() {
            var c = document.getElementById("budget_canvas");
            var ctx = c.getContext("2d");
            var target = this.collection.models[0].get("data");
            var actual = this.collection.models[1].get("data");
            target = parseFloat(target.substring(1, target.length));
            actual = parseFloat(actual.substring(1, actual.length));
            percent = actual / target;
            var colour = "#80C99C";
            drawGraph(ctx, percent, colour);
        }
    });

    var InvestmentView = Backbone.View.extend({
        el: "#investment",

        initialize: function() {
            this.collection = collections.investmentList;
            this.render();
            this.renderGraph();
        },

        render: function() {
            var that = this;
            _.each(this.collection.models, function(item) {
                that.renderGraphData(item);
            }, this);
        },

        renderGraphData: function(item) {
            var graphDataView = new GraphDataView({
                model: item
            });
            this.$el.append(graphDataView.render().el);
        },

        renderGraph: function() {
            var c = document.getElementById("investment_canvas");
            var ctx = c.getContext("2d");
            ctx.beginPath();
            var target = this.collection.models[1].get("data");
            var actual = this.collection.models[0].get("data");
            target = parseFloat(target.substring(0, target.length - 1));
            actual = parseFloat(actual.substring(0, actual.length - 1));
            percent = actual / target;
            var colour = "#D82253";
            drawGraph(ctx, percent, colour);
        }

    });

    var TeamSatisfactionView = Backbone.View.extend({
        el: "#team_satisfaction",

        initialize: function() {
            this.collection = collections.teamSatisfactionList;
            this.render();
            this.renderGraph();
        },

        render: function() {
            var that = this;
            _.each(this.collection.models, function(item) {
                that.renderGraphData(item);
            }, this);
        },

        renderGraphData: function(item) {
            var graphDataView = new GraphDataView({
                model: item
            });
            this.$el.append(graphDataView.render().el);
        },

        renderGraph: function() {
            var c = document.getElementById("team_satisfaction_canvas");
            var ctx = c.getContext("2d");
            var target = this.collection.models[0].get("data");
            var actual = this.collection.models[1].get("data");
            target = parseFloat(target.substring(0, target.length - 1));
            actual = parseFloat(actual.substring(0, actual.length - 1));
            percent = actual / target;
            var colour = "#666666";
            drawGraph(ctx, percent, colour);
        }
    });

    var Deadline = Backbone.Model.extend({
        defaults: {
            date: "",
            task: ""
        }
    });

    var DeadlineList = Backbone.Collection.extend({
        model: Deadline
    });

    var DeadlineView = Backbone.View.extend({
        tagName: "div",
        template: $("#deadlineTemplate").html(),

        render: function() {
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        }
    });

    var DeadlineListView = Backbone.View.extend({
        el: "#deadlines",

        initialize: function() {
            this.collection = collections.deadlineList;
            this.render();
        },

        render: function() {
            var that = this;
            _.each(this.collection.models, function(item) {
                that.renderDeadline(item);
            }, this);
        },

        renderDeadline: function(item) {
            var deadlineView = new DeadlineView({
                model: item
            });
            this.$el.append(deadlineView.render().el);
        }
    });

    var News = Backbone.Model.extend({
        defaults: {
            date: "",
            news: "",
            author: ""
        }
    });

    var NewsList = Backbone.Collection.extend({
        model: News
    });

    var NewsView = Backbone.View.extend({
        tagName: "div",
        template: $("#newsTemplate").html(),

        render: function() {
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        }
    });

    var NewsListView = Backbone.View.extend({
        el: "#news_feed",

        initialize: function() {
            this.collection = collections.newsList;
            this.render();
        },

        render: function() {
            var that = this;
            _.each(this.collection.models, function(item) {
                that.renderNews(item);
            }, this);
        },

        renderNews: function(item) {
            var newsView = new NewsView({
                model: item
            });
            this.$el.append(newsView.render().el);
        }
    });

    var UsefulLink = Backbone.Model.extend({
        defaults: {
            link: "",
            name: "",
            description: ""
        }
    });

    var LinkList = Backbone.Collection.extend({
        model: UsefulLink
    });

    var LinkView = Backbone.View.extend({
        tagName: "div",
        template: $("#linkTemplate").html(),

        render: function() {
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        }
    });

    var LinkListView = Backbone.View.extend({
        el: "#useful_links",

        initialize: function() {
            this.collection = collections.linkList;
            this.render();
        },

        render: function() {
            var that = this;
            _.each(this.collection.models, function(item) {
                that.renderLink(item);
            }, this);
        },

        renderLink: function(item) {
            var linkView = new LinkView({
                model: item
            });
            this.$el.append(linkView.render().el);
        }
    });

    var Product = Backbone.Model.extend({
        defaults: {
            name: "",
            dots: "",
            description: ""
        }
    });

    var ProductList = Backbone.Collection.extend({
        model: Product
    });

    var ProductView = Backbone.View.extend({
        tagName: "div",
        template: $("#productTemplate").html(),

        render: function() {
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        }
    });

    var StartUpListView = Backbone.View.extend({
        el: "#start_up",

        initialize: function() {
            this.collection = collections.startUpList;
            this.render();
        },

        render: function() {
            var that = this;
            _.each(this.collection.models, function(item) {
                that.renderProduct(item);
            }, this);
        },

        renderProduct: function(item) {
            var productView = new ProductView({
                model: item
            });
            this.$el.append(productView.render().el);
        }
    });

    var OperationalListView = Backbone.View.extend({
        el: "#operational",

        initialize: function() {
            this.collection = collections.operationalList;
            this.render();
        },

        render: function() {
            var that = this;
            _.each(this.collection.models, function(item) {
                that.renderProduct(item);
            }, this);
        },

        renderProduct: function(item) {
            var productView = new ProductView({
                model: item
            });
            this.$el.append(productView.render().el);
        }
    });

    var PassiveListView = Backbone.View.extend({
        el: "#passive",

        initialize: function() {
            this.collection = collections.passiveList;
            this.render();
        },

        render: function() {
            var that = this;
            _.each(this.collection.models, function(item) {
                that.renderProduct(item);
            }, this);
        },

        renderProduct: function(item) {
            var productView = new ProductView({
                model: item
            });
            this.$el.append(productView.render().el);
        }
    });

    var Collections = Backbone.Model.extend({
        initialize: function() {
            this.budgetList = new GraphDataList();
            this.investmentList = new GraphDataList();
            this.teamSatisfactionList = new GraphDataList();
            this.deadlineList = new DeadlineList();
            this.newsList = new NewsList();
            this.linkList = new LinkList();
            this.startUpList = new ProductList();
            this.operationalList = new ProductList();
            this.passiveList = new ProductList();
            this.fetchCollections();
        },

        fetchCollections: function() {
            this.budgetList.reset(jsonData.budget);
            this.investmentList.reset(jsonData.investment);
            this.teamSatisfactionList.reset(jsonData.teamSatisfaction);
            this.deadlineList.reset(jsonData.deadlines);
            this.newsList.reset(jsonData.newsFeed);
            this.linkList.reset(jsonData.usefulLinks);
            this.startUpList.reset(jsonData.startUp);
            this.operationalList.reset(jsonData.operational);
            this.passiveList.reset(jsonData.passive);
        }
    });

    var collections = "";

    var EndGameIntranetView = Backbone.View.extend({
        initialize: function() {
            collections = new Collections();
            this.render();
        },

        render: function() {
            var bugetView = new BudgetView();
            var investmentView = new InvestmentView();
            var teamSatisfactionView = new TeamSatisfactionView();
            var deadlineListView = new DeadlineListView();
            var newsListView = new NewsListView();
            var linkListView = new LinkListView();
            var startUpListView = new StartUpListView();
            var operationalListView = new OperationalListView();
            var passiveListView = new PassiveListView();
        }
    });

    var jsonData = "";
    var dataReady = false;
    $.ajax({
        url: "https://data.hoi.io/EndGamePortal/data",
        type: "GET",
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        headers: {
            "Authorization": "Hoist NTUOLFDMGAPGMVT[LOIX"
        },
        success: function(data) {
            jsonData = data;
            var masterView = new EndGameIntranetView();
        },
        error: function() {
            console.log("data get unsuccessful");
        }
    });
}(jQuery));