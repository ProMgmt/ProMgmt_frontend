import React from 'react';
import * as orgActions from '../../../action/org-actions.js';
import * as util from '../../../lib/util.js';

class OrgPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.org ? 
      {...props.org} :
      {
        _id: undefined,
        name: '',
        desc: '',
      }
  }

  componentWillReceiveProps(props) {
    if(this.props.org) {
      console.log('component received props');
      this.setState(this.props.org);
    }
  }

  render() {
    return (
      <div className='org-previews'>
        <h3>{this.state.name}</h3>
        <p>{this.state.desc}</p>
        {/* TODO: add a link to the OrgItem page for each Org created */}
      </div>
    )
  }
}

export default OrgPreview;