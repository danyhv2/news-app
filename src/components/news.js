import React from 'react'
import api from '../util/api'

function MainContainer(props){
  return (
    <main className="news-container-main">{props.news.filter(function(data){
            		return data.title == props.selectedNews;
          }.bind(this)).map(function(info){
          		var date = new Date(info.sysPublishDate);
				var stringDate = date.toDateString().split(" ");
				var month = date.toLocaleString("en-us", { month: "long" });
				var number = stringDate[2]
				var year = stringDate[3];

          	return (
          		<div className="news-container-main__info" key={info.title}>
					<img className="news-container-main__img" src={'https://demo.dotcms.com/contentAsset/image/'+info.imageContentAsset+'/filter/Resize/resize_w/600'} />
          			<h1 className="news-container-main__title">{info.title}</h1>
					<time className="news-container-left__time">{month} {number}, {year}</time>
					<div dangerouslySetInnerHTML={{__html: info.story}}></div>

          		</div>
          		
          		)
          }.bind(this))}</main>
    )
}

function LeftContainer(props){
	return (
		<aside className={props.clicked ? 'news-container-left news-container-left--active': 'news-container-left'} 
			onClick={props.hide.bind(null, true)}>{props.news.map(function(data){
			
			var date = new Date(data.sysPublishDate);
			var stringDate = date.toDateString().split(" ");
			var month = date.toLocaleString("en-us", { month: "long" });
			var number = stringDate[2]
			var year = stringDate[3];

			return (
				<div className="news-container-left__info" key={data.title} 
					onClick={props.update.bind(null, data.title)}
					 style = {(data.title === props.selectedNews) ? {boxShadow: '5px 5px 16px #868383', padding: '18px' }: { }} >
					<img className="news-container-left__img" 
					src={'https://demo.dotcms.com/contentAsset/image/'+data.imageContentAsset+'/filter/Resize/resize_w/100'}/>
					<div className="news-container-left__text">
						<h1 className="news-container-left__title">{data.title}</h1>
						<time className="news-container-left__time">{month} {number}, {year}</time>
					</div>
					
				</div>
				
				) 
			}.bind(this))}</aside>
	)
}

class News extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			selectedNews : '',
			news: [],
			clicked: false
		}
		this.updateNews = this.updateNews.bind(this);
		this.hideNews = this.hideNews.bind(this);

	}

	componentDidMount(){
		api.fetchNews().then(function(response){
			this.setState(function(){
				return {
					news: response.data.contentlets,
					selectedNews : response.data.contentlets[0].title,
				}
			});
		}.bind(this));

		this.updateNews(this.state.selectedNews)
		
	}

	hideNews(val) {
		this.setState(() =>{
			return {
				clicked: val
			}
		})
		
	}

	updateNews(selected) {
		this.setState(() =>{
			return {
				selectedNews: selected,
			}
		})
	}

	render () {
		return (
			<div className="news-container">
				<div className="news-container-menu">
					<input className="news-container-menu__input" type="checkbox" onClick={this.hideNews.bind(null, false)}/>
				    <span className="news-container-menu__span"></span>
				    <span className="news-container-menu__span"></span>
				    <span className="news-container-menu__span"></span>
				    <LeftContainer news={this.state.news} selectedNews={this.state.selectedNews} update={this.updateNews} hide={this.hideNews} clicked={this.state.clicked} />
				</div>
				<MainContainer news={this.state.news} selectedNews={this.state.selectedNews}/>
			</div>
    	)
	}
}

module.exports = News;
