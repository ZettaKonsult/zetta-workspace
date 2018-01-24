import React from 'react';

export default function VisibilityChange(Component) {
  return class VisibilityChange extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        visible: true,
      };
    }
    componentDidMount() {
      document.addEventListener('visibilitychange', this.isPageVisible);
    }

    componentWillUnmount() {
      document.removeEventListener('visibilitychange', this.isPageVisible);
    }

    isPageVisible = () => {
      if (document.visibilityState === 'visible') {
        this.setState(visible);
      } else {
        this.setState(invisible);
      }
    };

    render() {
      return <Component visible={this.state.visible} {...this.props} />;
    }
  };
}

function visible(state, props) {
  return {
    visible: true,
  };
}

function invisible(state, props) {
  return {
    visible: false,
  };
}
