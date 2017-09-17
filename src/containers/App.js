import React, {
  Component,
} from 'react';
import Search from './Search';
import Filter from './Filter';
import Header from './Header';
import SideBar from './SideBar';
import Main from './Main';
import Recipe from './Recipe';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route, Link, Switch} from 'react-router-dom';
import Footer from './Footer';

export default class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
        <div className="rogue-wrapper">
            <Header/>
            <SideBar />
            <Switch>
                <Route exact={true} path="/" component={Main}></Route>
                <Route path="/search" component={Search}></Route>
                <Route path="/filter" component={Filter}></Route>
                <Route path="/recipes/v=:id" component={Recipe}></Route>
            </Switch>
            <Footer />
        </div>
        </MuiThemeProvider>
    )
  }
}
