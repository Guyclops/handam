import { NavigationActions, StackActions } from "react-navigation";

let _container; // eslint-disable-line

function setContainer(container) {
  _container = container;
}

function reset(routeName, params) {
  _container.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          type: "Navigation/NAVIGATE",
          routeName,
          params
        })
      ],
      key: null
    })
  );
}

function navigate(routeName, params) {
  _container.dispatch(
    NavigationActions.navigate({
      type: "Navigation/NAVIGATE",
      routeName,
      params
    })
  );
}

function navigateBack() {
  _container.dispatch(NavigationActions.back());
}

function navigateDeep(actions) {
  _container.dispatch(
    actions.reduceRight(
      (prevAction, action) =>
        NavigationActions.navigate({
          type: "Navigation/NAVIGATE",
          routeName: action.routeName,
          params: action.params,
          action: prevAction
        }),
      undefined
    )
  );
}

function getCurrentRoute() {
  if (!_container || !_container.state.nav) {
    return null;
  }

  return _container.state.nav.routes[_container.state.nav.index] || null;
}

export default {
  setContainer,
  navigateDeep,
  navigate,
  navigateBack,
  reset,
  getCurrentRoute
};
