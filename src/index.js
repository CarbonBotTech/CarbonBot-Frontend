import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'moment-timezone';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import store from './store';

// Styling
import theme from './theme';
import './sass/bootstrap.scss';
import './sass/App.scss';

// Components
import Bootstrap from './Bootstrap';
import Home from './Home';
import Tracker from './GoogleAnalytics';

import Platform from './Platform';
import Tag from './Tag';
import Categories from './Categories';
import Notifications from './Notifications';
import DirectPost from './Post/DirectPost';

import { Login, Signup, Reset, Forgot, AccountConfirmation } from './Guest';
import { Community, NewArticle, NewPost, EditArticle } from './Community';
import { Bot } from './Bot';
import { Profile } from './Profile';
import { Collection, Collections } from './Collection';
import { Company } from './Company';
import { Settings } from './Settings';

ReactDOM.render((
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<SnackbarProvider maxSnack={3}>
			<Router>
				<Switch>
					<Route exact path="/signup" component={ Tracker(Signup) } />
					<Route exact path="/login" component={ Tracker(Login) } />
					<Route exact path="/confirmation" component={ Tracker(AccountConfirmation) } />
					<Route exact path="/forgot-password" component={ Tracker(Forgot) } />
					<Route exact path="/reset-password/:code" component={ Tracker(Reset) } />
					<Bootstrap>
						<Route exact path="/" component={ Tracker(Home) } />
						
						<Route exact path="/tag/:tag" component={ Tracker(Tag) } />
						<Route exact path="/bots/:slug" component={ Tracker(Bot) } />
						<Route exact path="/u/:username/:section?" component={ Tracker(Profile) } />
						<Route exact path="/company/:slug/:subsection?" component={ Tracker(Company) } />
						<Route exact path="/settings/:section/:subsection?" component={ Tracker(Settings) } />
						<Route exact path="/community/tags/:tag" component={ Tracker(Tag) } />
						<Switch>
							<Route exact path="/notifications" component={ Tracker(Notifications) } />
							<Route exact path="/categories" component={ Tracker(Categories) } />
							<Route exact path="/collections" component={ Tracker(Collections) } />
							<Route exact path="/collections/:slug" component={ Tracker(Collection) } />
							<Route exact path="/community/new/article" component={ Tracker(NewArticle) } />
							<Route exact path="/community/new/post" component={ Tracker(NewPost) } />
							<Route exact path="/community/:post_id/edit" component={ Tracker(EditArticle) } />
							<Route exact path="/community/" component={ Tracker(Community) } />
							<Route exact path="/community/top/:trend" component={ Tracker(Community) } />
							<Route exact path="/community/:post_id" component={ Tracker(DirectPost) } />
							<Route exact path="/:platform?" component={ Tracker(Platform) } />
						</Switch>
					</Bootstrap>
				</Switch>
			</Router>
			</SnackbarProvider>
		</MuiThemeProvider>
	</Provider>
), document.getElementById('root'));