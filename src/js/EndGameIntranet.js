$(function(){
	var Deadline = Backbone.Model.extend({
		defaults: {
			date:"",
			task:"",
		}
	});
	
	var DeadlineList = Backbone.Collection.extend({
		url: "/Users/eilis/git/Clones/internal-dashboard/src/js",
		model: Deadline,
		
		parse: function(res){
			return res.deadlines;
		}
	});
		
	var DeadlineView = Backbone.View.extend({
		tagName: "li",
		template: $("deadlineTemplate").html(),
		
		render: function () {
            var tmpl = _.template(this.template);
			$(this.el).html(tmpl(this.model.toJSON()));
			return this;
		}
	});
	
	var DeadlineListView = Backbone.View.extend({
		el: $("#deadline_list"),
		
		initialize: function () {
			//this.collection = collections.deadlineList;
			this.collection = deadlineList;
			this.render();
		},
		
		render: function () {
			var that = this;
			_.each(this.collection.models, function(item) {
				that.renderDeadline(item);
			}, this);
		},
		
		renderDeadline: function() {
			var deadlineView = new DeadlineView({
				model: item
			});
			this.$el.append(deadlineView.render().el);
		}
	});
	
	/*
	var News = Backbone.Model.extend({
		defaults: {
			date:"",
			news:"",
			author;""
		}
	});
	
	var NewsList = Backbone.Collection.extend({
		model: News
	});
	
	var UsefulLink = Backbone.Model.extend({
		defaults: {
			date:"",
			task:"",
		}
	});
	
	var LinkList = Backbone.Collection.extend({
		model: UsefulLink;
	});
	*/
	
/*
	
	var Collections = Backbone.Model.extend({
		url: "js/EndGameIntranet.json",
		
		initialize: function() {
			this.deadlineList = new DeadlineList();
			/*this.newsList = new NewsList();
			this.linkList = new LinkList();*/
/*			this.on("change", this.fetchCollections, this);
		},
		
		fetchCollections: function(){
			this.deadlineList.reset(this.get("deadlines"));
			// this.newsList.reset(this.get("newsFeed"));
			// this.linkList.reset(this.get("usefulLinks"))
		}
	});
	
	var collections = new Collections();
	collections.fetch();
	*/
	
	var deadlineList = new DeadlineList();
	deadlineList.fetch();
	
	var deadlineListView = new DeadlineListView();
} (jQuery));