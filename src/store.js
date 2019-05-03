import Vue from 'vue';
import Vuex from 'vuex';
import Backend from './services/backend';

Vue.use(Vuex);
const backend = new Backend();

export default new Vuex.Store({
    state: {
      currentUser: null,
      products: [],
      comments: {}
    },
    mutations: {
        setCurrentUser(state, user) {
            state.currentUser = user;
        },
        setProducts(state, products) {
            state.products = products;
        },
        setCommentsToProduct(state, { product_id, comments }) {
            state.comments = { ...state.comments, [product_id]: comments };
            // state.comments[product_id] = comments;
        }
    },
    actions: {
        login({ commit }, data) {
            return new Promise((resolve) => {
                backend.login(data)
                    .then(res => {
                        let { token, is_admin: isAdmin} = res.data;
                        commit('setCurrentUser', { isAdmin });
                        localStorage.setItem('user.authToken', token);
                        localStorage.setItem('user.isAdmin', isAdmin);
                        resolve();
                    })
                    .catch(error => {
                        alert(`Error ${error.response.status} ${error.response.statusText}`);
                    })

            })
        },
        auth({ commit }) {
            if (localStorage.getItem('user.authToken')) {
                backend.auth();
                let user = {
                    isAdmin: localStorage.getItem('user.isAdmin')
                };
                commit('setCurrentUser', user);
            }
        },
        logout({ commit }) {
            commit('setCurrentUser', null);
            localStorage.removeItem('user.authToken');
            localStorage.removeItem('user.isAdmin');
        },
        

        getProducts({ commit, dispatch }) {
            backend.getProducts()
                .then(res => {
                    let products = res.data.data;
                    commit('setProducts', products);
                    for (let i in products) {
                        dispatch('getComments', products[i].id);
                    }
                });
        },
        addProduct({ dispatch }, product) {
            backend.addProduct(product)
                .then(() => {
                    dispatch('getProducts');
                })
                .catch(error => {
                    alert(`Error ${error.response.status} ${error.response.statusText}`);
                });
        },
        editProduct({ dispatch }, product) {
            backend.editProduct(product)
                .then(() => {
                    dispatch('getProducts');
                })
                .catch(error => {
                    alert(`Error ${error.data.messstatus} ${error.response.statusText}`);
                });
        },
        deleteProduct({ dispatch }, productId) {
            backend.deleteProduct(productId)
                .then(() => {
                    dispatch('getProducts');
                })
                .catch(error => {
                    alert(`Error ${error.response.status} ${error.response.statusText}`);
                });
        },

        getComments({ commit }, product_id) {
            backend.getComments(product_id)
                .then(response => {
                    let comments = response.data;
                    commit('setCommentsToProduct', { product_id, comments });
                })
                .catch(error => {
                    alert(`Error ${error.response.status} ${error.response.statusText}`);
                });
        },
        addComment({ dispatch }, { comment, product_id }) {
            backend.addComment(comment, product_id)
                .then(() => {
                    dispatch('getComments', product_id);
                })
                .catch(error => {
                    alert(`Error ${error.response.status} ${error.response.statusText}`);
                });
        },
        deleteComment({ dispatch }, { id, product_id }) {
            backend.deleteComment(id)
                .then(() => {
                    dispatch('getComments', product_id);
                })
                .catch(error => {
                    alert(`Error ${error.response.status} ${error.response.statusText}`);
                });
        }
    }
  })