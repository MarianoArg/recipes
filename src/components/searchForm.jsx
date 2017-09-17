import React, {Component} from 'react';
import Search from 'material-ui/svg-icons/action/search';


class SearchButton extends Component {
    submitForm(e) {
        e.preventDefault();
        this.props.search(this.refs.searchBox.value);
    }

    render() {
        return (
            <form onSubmit={this.submitForm.bind(this)} className="search-item">
                <input type="text" ref="searchBox"name="searchText" placeholder="Keyword..."/>
                <button type="submit" className="submit-button">
                    <Search color='#fff'/>
                </button>
            </form>
        );
    }
}

export default SearchButton;
