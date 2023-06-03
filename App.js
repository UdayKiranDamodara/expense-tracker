import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import AppEntry from './AppEntry'
import store from './store'

export default function App() {
  return (
    <Provider store={store}>
      <AppEntry />
    </Provider>
  )
}

AppRegistry.registerComponent('expense-tracker', () => App)
