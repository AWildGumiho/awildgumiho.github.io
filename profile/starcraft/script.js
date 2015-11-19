//Backbone for Moon Glaive

//I'm creating the model account. 
var Account = Backbone.Model.extend({
	defaults: {
		username:'',
		idnumber:'',
		notes:''
	},
	function(){
		alert("New account information added. Press save below to save changes.");
	}
});

// I'm creating a new collection.

var Accounts = Backbone.Collection.extend({});

// I'm instantiating a collection

var accounts = new Accounts();

// View for one account

var AccountView = Backbone.View.extend({
	model: new Account(),
	tagName: 'tr',
	initialize: function(){
		this.template = _.template($('.accounts-list-template').html());
	},
	events: {
		'click .edit-account': 'edit',
		'click .update-account': 'update',
		'click .delete-account': 'delete',
		'click .cancel': 'cancel'
	},
	edit: function(){
		this.$('.edit-account').hide();
		this.$('.delete-account').hide();
		this.$('.update-account').show();
		this.$('.cancel').show();

		var username = this.$('.username').html();
		var idnumber = this.$('.idnumber').html();
		var	notes = this.$('.notes').html();

		this.$('.username').html('<input type="text" class="form-control username-update"  value ="' +username + '">');
		this.$('.idnumber').html('<input type="text" class="form-control idnumber-update"  value ="' +idnumber + '">');
		this.$('.notes').html('<input type="text" class="form-control notes-update"  value ="' +notes + '">');
	},
	update: function(){
		this.model.set('username', $('.username-update').val());
		this.model.set('idnumber', $('.idnumber-update').val());
		this.model.set('notes', $('.notes-update').val());
	},
	cancel: function(){
		accountsView.render();
	},
	delete: function(){
		this.model.destroy();
	},
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

/// Views for all accounts


var AccountsView = Backbone.View.extend({
	model: accounts,
	el: $('.accounts-list'),
	initialize: function(){
		var self= this;
		this.model.on('add', this.render, this);
		this.model.on('change', function(){
			setTimeout(function(){
				self.render();
			}, 30);
		}, this);
		this.model.on('remove', this.render,this);
	},
	render: function(){
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(account){
			self.$el.append((new AccountView({model: account})).render().$el);
		});
		return this;
	}
});

var accountsView = new AccountsView();

$(document).ready(function(){
	$('.add-account').on('click',function(){
		var account = new Account({
			username:$('.username-input').val(),
			idnumber:$('.idnumber-input').val(),
			notes:$('.notes-input').val()
		});
		$('.username-input').val('');
		$('.idnumber-input').val('');
		$('.notes-input').val('');

	console.log(account.toJSON());
	accounts.add(account);
	})
})