class Messanger {
  constructor() {
    this.array = {}
  }
      on (key, func) {
        if (!this.array[key]) {
          this.array[key] = [];
        }
          this.array[key].push(func);
        return()=> {
          console.log('returned func');
          return this.off(key, func);
        };
      };
      trigger (key, data) {
        if(this.array[key]){
          for (let arr of this.array[key]) {
              arr(data);
          }
        }
      };
      off (key, func) {
        let index = [];
        if(this.array[key]){
          this.array[key].forEach((arr, ind)=>{
            if(arr === func){
              index.push(ind);
            }
          });
          index.reverse();
          index.forEach((i)=>this.array[key].splice(i, 1));
        }
        console.log(this.array[key]);
      }
}

const em = new Messanger();

em.on('hello', function (data) {
  console.log(data);
});

em.on('key', function (data) {
  console.log(data);
});

em.trigger('hello', 'there');

// em.off('hello');

em.trigger('hello', 'there');

em.on('hello', function (data) {
  console.log (data);
});

em.on('keys', function (data){
  console.log(data, '0');
});

const removeIt = em.on('keys', function (data){
  console.log(data);
});

em.on('keys', function (data){
  console.log(data, '2');
});

// removeIt();

em.trigger('keys', 'kakaka');


function Router() {
  let routesArray = [];
  return {
    addRoute: function (routeName, handler) {
      const index = routeName.indexOf(':');
      let obj = {
        callback: handler,
        params: []
      };
      if (index !== -1) {
        const urlArray = routeName.split('/');
        urlArray.forEach((item, index) => {
          if (index === 0) {
            obj.url = item;
          }
          else {
            if (item.startsWith(':')) {
              const key = item.slice(1);
              obj.params.push({key, index, value: ''})
            }
          }
        });
      }
      else {
        obj.url = routeName;
      }
      routesArray.push(obj);
    },
    route: function (routeName) {
      for (let i of routesArray) {
        if (routeName.includes(i.url)) {
          if (i.params.length > 0) {
            const urlArray = routeName.split('/');
            i.params.forEach((param) => {
              param.value = urlArray[param.index];
              i.callback(routeName, param);
            });

          }


        }
      }
    }
  }
}

let router = new Router;

// router.addRoute('/home/:name/settings/:bla', function(url, param){console.log(param.value)});
// router.route('/home/bla/settings/there');