import React from 'react'
import ReactDom from 'react-dom';
import marry from '../../../resources/imgs/marry.jpeg'
import { helloworld } from '../../components/helloworld';

import './search.less'
class Search extends React.Component {
    render () {
        console.log(helloworld())

        return <div className="search-text">
            search test123
            <img src={marry}/>
            </div>
    }
}

ReactDom.render(<Search />, document.querySelector('#app'))