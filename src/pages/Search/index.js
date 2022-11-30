import React from 'react'
import ReactDom from 'react-dom';
import marry from '../../../resources/imgs/marry.jpeg'


import './search.less'
class Search extends React.Component {
    render () {
        return <div className="search-text">
            search test123
            <img src={marry}/>
            </div>
    }
}

ReactDom.render(<Search />, document.querySelector('#app'))