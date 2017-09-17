import React, {Component} from 'react';
import FilterBox from './filterBox.jsx';
import Drawer from 'material-ui/Drawer';
import {Link} from 'react-router-dom';
import VeggiesAvatar from '../images/Veggies.jpg'
import FruitsAvatar from '../images/Fruits.jpg'
import MeatsAvatar from '../images/Meats.jpg'
import SpicesAvatar from '../images/Spices.jpg'

const ingr = {
        Veggies: {
            avatar:VeggiesAvatar,
            ing: ['Avocado', 'Garlic', 'Lettuce', 'Arugula', 'Onions']
        },
        Fruits: {
            avatar:FruitsAvatar,
            ing: ['Tomato', 'Apple', 'Orange', 'Pear', 'Banana'],
        },
        Meats: {
            avatar:MeatsAvatar,
            ing: ['Chicken', 'Fish', 'Duck', 'Res'],
        },
        Spices: {
            avatar:SpicesAvatar,
            ing: ['Curry', 'Paprika']
        }
};

export default class SideBar extends Component {
	render() {
    	const {actions} = this.props;

		return (
			<Drawer open={true} className="rogue-sidebar">
                                        <section className="rogue-sidebar-header">
                                                <Link to="/">Recipes</Link>
                                        </section>
			     <FilterBox ingredientes={ingr} actions={ actions }/>
		          </Drawer>
		)
	}

}
