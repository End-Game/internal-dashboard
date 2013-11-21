$(function(){
    var GraphData = Backbone.Model.extend({
        defaults: {
            title:"",
            data:""
        }
    });
    
    var GraphDataList = Backbone.Collection.extend({
        model: GraphData
    });
        
    var GraphDataView = Backbone.View.extend({
        tagName: "p",
        className: "textSC",
        template: $("#graphDataTemplate").html(),
        
        render: function () {
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        }
    });
    
    var BudgetView = Backbone.View.extend({
        el: "#budget",
        
        initialize: function () {
            this.collection = collections.budgetList;
            this.render();
        },
        
        render: function () {
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
        }
    });
    
    var InvestmentView = Backbone.View.extend({
        el: "#investment",
        
        initialize: function () {
            this.collection = collections.investmentList;
            this.render();
        },
        
        render: function () {
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
        }
    });
    
    var TeamSatisfactionView = Backbone.View.extend({
        el: "#team_satisfaction",
        
        initialize: function () {
            this.collection = collections.teamSatisfactionList;
            this.render();
        },
        
        render: function () {
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
        }
    });
    
    var Deadline = Backbone.Model.extend({
        defaults: {
            date:"",
            task:""
        }
    });
    
    var DeadlineList = Backbone.Collection.extend({
        model: Deadline
    });
        
    var DeadlineView = Backbone.View.extend({
        tagName: "div",
        template: $("#deadlineTemplate").html(),
        
        render: function () {
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        }
    });
    
    var DeadlineListView = Backbone.View.extend({
        el: "#deadlines",
        
        initialize: function () {
            this.collection = collections.deadlineList;
            this.render();
        },
        
        render: function () {
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
            date:"",
            news:"",
            author:""
        }
    });
    
    var NewsList = Backbone.Collection.extend({
        model: News
    });
    
    var NewsView = Backbone.View.extend({
        tagName: "div",
        template: $("#newsTemplate").html(),
        
        render: function () {
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        }
    });
    
    var NewsListView = Backbone.View.extend({
        el: "#news_feed",
        
        initialize: function () {
            this.collection = collections.newsList;
            this.render();
        },
        
        render: function () {
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
            link:"",
            name:"",
            description:""
        }
    });
    
    var LinkList = Backbone.Collection.extend({
        model: UsefulLink
    });
    
    var LinkView = Backbone.View.extend({
        tagName: "div",
        template: $("#linkTemplate").html(),
        
        render: function () {
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        }
    });
    
    var LinkListView = Backbone.View.extend({
        el: "#useful_links",
        
        initialize: function () {
            this.collection = collections.linkList;
            this.render();
        },
        
        render: function () {
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
            title:"",
            dots:"",
            description:""
        }
    });
    
    var ProductList = Backbone.Collection.extend({
        model: Product
    });
    
    var ProductView = Backbone.View.extend({
        tagName: "div",
        template: $("#productTemplate").html(),
        
        render: function () {
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        }
    });
    
    var StartUpListView = Backbone.View.extend({
        el: "#start_up",
        
        initialize: function () {
            this.collection = collections.startUpList;
            this.render();
        },
        
        render: function () {
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
        
        initialize: function () {
            this.collection = collections.operationalList;
            this.render();
        },
        
        render: function () {
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
        
        initialize: function () {
            this.collection = collections.passiveList;
            this.render();
        },
        
        render: function () {
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
        url: "js/EndGameIntranet.json",
        
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
            this.on("change", this.fetchCollections, this);
        },
        
        fetchCollections: function(){
            this.budgetList.reset(this.get("budget"));
            this.investmentList.reset(this.get("investment"));
            this.teamSatisfactionList.reset(this.get("teamSatisfaction"));
            this.deadlineList.reset(this.get("deadlines"));
            this.newsList.reset(this.get("newsFeed"));
            this.linkList.reset(this.get("usefulLinks"));
            this.startUpList.reset(this.get("startUp"));
            this.operationalList.reset(this.get("operational"));
            this.passiveList.reset(this.get("passive"));
        }
    });
    
    var collections = new Collections();

    var EndGameIntranetView = Backbone.View.extend({
        initialize: function() {
            collections = new Collections();
            collections.on("change", this.render, this);
            collections.fetch();
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

    var masterView = new EndGameIntranetView();
    
} (jQuery));