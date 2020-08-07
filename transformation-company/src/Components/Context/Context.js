import React from "react";
const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return {
          ...state,
          fighters: [action.payload, ...state.fighters]
        }
        break;
        case "SHOWTABLE":
        return {
          ...state,
          showTableFight: [action.payload]
        }
        default:
          return state
    }
  }

export class Provider extends React.Component {
    state = {
        fighters: [],
        showTableFight: false,
        dispatch: action => {
            this.setState(state => {
              return reducer(state, action);
            });
          },
      };
      
    render() {
        return (
          <Context.Provider value={this.state}>
            {this.props.children}
          </Context.Provider>
        );
      }
}
export const Consumer = Context.Consumer;
