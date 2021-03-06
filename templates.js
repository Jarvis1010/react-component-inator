module.exports.jsCreator = component => {
  return `import React from 'react';
import styles from './${component}.css';
import classes from 'join-classnames';

export const ${component} = ({className}) => (
    <div className={classes(className, styles.${component})}>
      <span>Hello, World!</span>       
    </div>
);


export default ${component};
`;
};

module.exports.storyCreator = component => {
  return `import {storiesOf, action} from '@kadira/storybook';
import ${component} from './${component}';
import React from 'react';

storiesOf ('${component}', module)
  .add ('default', () => <${component} />)
`;
};

module.exports.packageJSON = component => {
  return `{
  "main": "${component}.js"
}
`;
};

module.exports.stylesCSS = component => {
  return `
.${component}{

}
`;
};

module.exports.viewJS = component => {
  return `import React from 'react';
import styles from './${component}.css';


export default () => (

    <div className={styles.view}>

    </div>
);
`;
};

module.exports.containerJS = component => {
  return `import React, {Component} from 'react';
import { connect } from 'react-redux';
import { setPageMeta } from '../actions/page-meta';
//Stubbed out View
const DummyView =()=><h1>dummy</h1>;

const pageMeta = {
  title: "...",
  tags: [
      {"name": "description", "content": "A React Starter"},
      {"property": "og:type", "content": "article"}
  ]
};

// takes values from the redux store and maps them to props
const mapStateToProps = state => ({
  //propName: state.data.specificData
});

// binds the result of action creators to redux dispatch, wrapped in callable functions
const bindActionsToDispatch = dispatch => ({
  setPageMeta: (meta) => { dispatch(setPageMeta(meta)) }
});

// takes the result of mapStateToProps as store, and bindActionsToDispatch as actions
// returns the final resulting props which will be passed to the component
const mergeAllProps = (store, actions) => ({
  ...store,
  init: () => actions.setPageMeta(pageMeta),
  //propName:data
});


const storeConnector = connect(
  mapStateToProps, 
  bindActionsToDispatch, 
  mergeAllProps
);



class ${component} extends Component {

  static onServer(props, store) {
    return store.dispatch(setPageMeta(pageMeta))
  }

  componentDidMount() {
    this.props.init();
  }

  render() {
    return <DummyView {...this.props} />
  }

}

export default storeConnector(${component});
`;
};
