import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class FilterList extends Component {

    _onCheck(val, ev, isChecked) {
        this.props.filter(val, isChecked);
        this.props.actions.setFilters(val, isChecked);
    }

    render() {
        const ingredientes = this.props.ingredientes;
        const actives = this.props.activeFilters;
        let listaIngredientes = [];

        for(let category in ingredientes) {
                let key = Object.keys(ingredientes).indexOf(category);
                listaIngredientes.push(
                    <Divider key={key}/>,
                    <ListItem key={category}
                        primaryText={category}
                        initiallyOpen={false}
                        leftAvatar={<Avatar src={ingredientes[category].avatar} />}
                        primaryTogglesNestedList={true}
                        nestedItems={ ingredientes[category].ing.map((ing) =>
                        <ListItem
                                leftCheckbox={<Checkbox defaultChecked={(actives.indexOf(ing) !== -1) ? true : false} onCheck={this._onCheck.bind(this, ing)}/>}
                                primaryText={ing}
                                 key={ing}
                            />
                        )}
                    />
                );
        }

        const headerStyle = {
            fontSize: '16px'
        }

        return (
            <div className="filters">
                  <List>
                  <Subheader style={headerStyle}>Filter by:</Subheader>
                    {listaIngredientes}
                    </List>
            </div>
        );
    }
}

export default FilterList;
