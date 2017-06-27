import React from 'react'
import News from './news'

class App extends React.Component {
	render (){
		return (
			<div>
				<header className="news-container__header">DotCMS News Listing</header>
				<News />
			</div>
		)
	}
}

module.exports = App;