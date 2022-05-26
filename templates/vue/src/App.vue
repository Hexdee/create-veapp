<template>
  <div class="App">
    <header class="App-header">
      <h1 class="title">VeCounter</h1>
      <button v-if="isSignedIn()" class="App-button" @click="logout()">Disconnect</button>
      <button v-else class="App-button" @click="login()">Connect Sync</button>
    </header>
    <main class="App-main">
      <p v-if="isSignedIn()" class="signer">Signer: {{signer}}</p>
      }
      <CounterDisplay></CounterDisplay>
      <div class="counter-buttons">
        <button class="App-button" @click="increase()">Increase</button>
        <button class="App-button" @click="decrease()">Decrease</button>
      </div>
      <button class="App-button" @click="reset()">Reset</button>
    </main>
    <footer class="App-footer">
      <p>Hexdee &copy;2022</p>
    </footer>
  </div>
</template>

<script>
import CounterDisplay from './components/CounterDisplay.vue';
import {connex, Contract} from './config/connex'
export default {
    name: "App",
    components: { CounterDisplay },
    data() {
      return {
        signer: ""
      }
    },
    methods: {
      isSignedIn() {
        return this.signer !== ""
      },
      increase() {
        Contract.increase()
      },
      decrease() {
        Contract.decrease()
      },
      reset() {
        Contract.reset()
      },
        // This can be used to get user's identification
      login() {
        connex.vendor
          .sign("cert", {
            purpose: "identification",
            payload: {
              type: "text",
              content: "Please sign this certificate to login"
            }
          })
          //.accepted(() => alert("accepted"))
          .request()
          .then((r) => {
            this.signer = r.annex.signer
          })
          .catch((e) => console.log("error:" + e.message));
      },
      logout() {
        this.signer = ""
      }
    }
};
</script>

<style>
.App {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #282c34;
}

.App-header {
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  border-bottom: 1px solid #3b4457;
}

.App-button {
  padding: 16px 32px;
  border-radius: 16px;
  background-color: #61dafb;
  border: 0;
}

.App-button:hover {
  background-color: white;
}

.App-main {
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
}

.counter-buttons {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  align-items: center;
}

.App-footer {
  border-top: 1px solid #3b4457;
  color: white;
  display: flex;
  justify-content: center;
}

main .signer {
  color: white;
}
</style>
