import axios from 'axios'

module.exports = {
	fetchNews: function() {
		var encodedURI = window.encodeURI('https://demo.dotcms.com/api/content/render/false/type/json/query/+contentType:News +(conhost:48190c8c-42c4-46af-8d1a-0cd5db894797 conhost:SYSTEM_HOST) +languageId:1 +deleted:false +working:true/orderby/News.sysPublishDate desc');

		return axios.get(encodedURI)
			.then(function(response){
				return response;
		});
	}
}