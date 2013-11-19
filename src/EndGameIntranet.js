$(document).ready(function(){
	$.ajax(
		{url:"EndGameIntranet.json", 
		success:function(data){
			var budget = data.budget;
			var p = '<p class="textSC"><span>Target:</span>$' + budget.target +
				' <span>Actual:</span>$' + budget.actual + '</p>';
			$('#budget').append(p);
			var investment = data.investment;
			p = '<p class="textSC"><span>Support Ratio:</span>' + investment.supportRatio +
				'% <span>Target:</span>' + investment.target + '%</p>';
			$('#investment').append(p);
			var teamSatisfaction = data.teamSatisfaction;
			p = '<p class="textSC"><span>Target:</span>' + teamSatisfaction.target +
				'% <span>Actual:</span>' + teamSatisfaction.actual + '%</p>';
			$('#team_satisfaction').append(p);
			var deadlines = data.deadlines;
			var div = '';
			for(var i=0; i < deadlines.length; i++){
				var deadline = deadlines[i];
				div = '<div' + (i===0? ' id="first_deadline"':'') +
					'><p class="date_text">' + deadline.date + '</p><p class="text">'+
					deadline.task +'</p></div>';
				$('#deadlines').append(div);
			}
			var newsFeed = data.newsFeed;
			for(i=0; i < newsFeed.length; i++){
				var news = newsFeed[i];
				div = '<div' + (i===0? ' id="first_news"':' class="news"') +
					'><p class="date_text">' + news.date + '</p><p class="text">' +
					news.news +'</p><p class="author_text">' + news.author +
					'</p></div>';
				$('#news_feed').append(div);
			}
			var usefulLinks = data.usefulLinks;
			for(i=0; i < usefulLinks.length; i++){
				var link = usefulLinks[i];
				div = '<div' + (i===0? ' id="first_link"':'') +
					'><p class="text"><a href="' + link.link + '">' + link.name +
					'</a> ' + link.description + '</p></div>';
				$('#useful_links').append(div);
			}
			var startUp = data.startUp;
			var product = '';
			for(i=0; i < startUp.length; i++){
				product = startUp[i];
				div = '<div><p class="text">' + product.title + '</p><img src="Images/' +
					product.dots + 'Dot.png"/><p class="small_text">' + product.description +
					'</p></div>';
				$('#start_up').append(div);
			}
			var operational = data.operational;
			for(i=0; i < operational.length; i++){
				product = operational[i];
				div = '<div><p class="text">' + product.title + '</p><img src="Images/' +
					product.dots + 'Dot.png"/><p class="small_text">' + product.description +
					'</p></div>';
				$('#operational').append(div);
			}
			var passive = data.passive;
			for(i=0; i < passive.length; i++){
				product = passive[i];
				div = '<div><p class="text">' + product.title + '</p><img src="Images/' +
					product.dots + 'Dot.png"/><p class="small_text">' + product.description +
					'</p></div>';
				$('#passive').append(div);
			}
	}});
});