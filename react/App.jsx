var React = require('react/addons');
var Main = require('./components/Main.jsx');


var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

function safeStringify(obj) {
	return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

module.exports = React.createClass({
	displayName: 'App',
	propTypes: {
		title: React.PropTypes.string,
		params: React.PropTypes.object
	},
	render: function() {
		var json = safeStringify(this.props);
		return (
			<html>
				<head lang="en">
					<base href="/"/>
					<meta charSet="utf-8"/>
					<meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
					<meta name="viewport" content="width=device-width, initial-scale=1"/>
					<title>{this.props.title}</title>
					<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" />
					<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" />
					<link href="/css/style.css" rel="stylesheet" />
				</head>
				<body>
					<canvas id="canvas"></canvas>
					<span id="props" dangerouslySetInnerHTML={{__html: json}}></span>
					<script type="text/javascript" src="/js/browserify/reactBundle.js"></script>
					<script src="/lib/impact/impact.js"></script>
					<script src="/lib/tools/grid.js"></script>
					<script src="/lib/game/index.js"></script>
				</body>
			</html>
		)
	}
});
