if(!window.Iter)(function(){
	var DATA = Symbol(), LEN = Symbol(), CURR = Symbol(), RETURN = Symbol(),
		Iter = function(v){
			this[DATA] = v;
			this[LEN] = v.length;
			this[CURR] = 0;
			this[RETURN] = {done:false};
		};
	Iter.prototype.next = function(){
		if(this[CURR] < this[LEN]) this[RETURN].value = this[DATA][this[CURR]++], this[RETURN].done = false;
		else this[RETURN].value = undefined, this[RETURN].done = true;
		return this[RETURN];
	};
	window.Iter = Iter;
})();
(function(){
	var fn = Array.prototype;
	if(!fn.forEach) fn.forEach = function(f){
		for(var i = 0, j = this.length; i < j; i++) f(this[i], i, this);
	};
	if(!fn.map)  = function(f){
		for(var r = [], i = 0, j = this.length; i < j; i++) r[i] = f(this[i], i, this);
		return r;
	};
	if(!fn.filter) fn.filter = function(f){
		for(var r = [], i = 0, j = this.length; i < j; i++) if(f(this[i], i, this)) r[r.length] = this[i];
		return r;
	};
	if(!fn.reduce) fn.reduce = function(){
		for(var f = arguments[0], i = 0, j = this.length, r = arguments.length == 2 ? arguments[1] : this[i++]; i < j; i++) r = f(r, this[i], i, this);
		return r;
	};
	if(!fn[Symbol.iterator]) fn[Symbol.iterator] = function(){return new Iter(this);};
	if(typeof Array.from != 'function') Array.from = function(v){
		var r = [], i;
		if(Symbol.iterator in v){
			v = v[Symbol.iterator]();
		}
		if('next' in v){
			do{
				i = v.next();
				if(i.done) break;
				else r[r.length] = i.value;
			}while(true);
		}
		return r;
	};
})();
if(typeof String.prototype[Symbol.iterator] != 'function') String.prototype[Symbol.iterator] = function(){return new Iter(this.split(''));}
