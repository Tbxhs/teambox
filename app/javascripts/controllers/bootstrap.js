Teambox.Controllers.Bootstrap = Backbone.Controller.extend({
  config: {},

  initialize: function(options) {
    var self = this,
        _loader = Teambox.modules.Loader(function () {
          // Set the new root url
          if (window.location.hash === '') {
            window.location.hash = '#!/';
          }

          self.build();
          Backbone.history.start();
        });

    Backbone.Controller.prototype.initialize.call(this, options);

    // Initialize models and collections
    this.my_user     = new Teambox.Models.User();
    this.my_tasks    = new Teambox.Collections.Tasks();
    this.my_threads  = new Teambox.Collections.Threads();
    this.my_projects = new Teambox.Collections.Projects();

    // Fetch all data we're going to need
    // Uses the Loader class, which updates the progress bar
    this.my_user.fetch({ success: _loader.load('user') });
    this.my_tasks.fetch({ success: _loader.load('tasks') });
    this.my_threads.fetch({ success: _loader.load('activities') });
    this.my_projects.fetch({ success: _loader.load('projects') });
  },
  build: function () {
    // Initialize views
    this.activities_view = new Teambox.Views.Activities({ app: this, collection: this.my_threads });
    this.today_view      = new Teambox.Views.Tasks({ app: this, collection: this.my_tasks, tasks_filter: 'today' });
    this.my_tasks_view   = new Teambox.Views.Tasks({ app: this, collection: this.my_tasks, tasks_filter: 'mine' });
    this.all_tasks_view  = new Teambox.Views.Tasks({ app: this, collection: this.my_tasks });
    this.projects_view   = new Teambox.Views.Projects({ app: this, collection: this.my_projects });
    this.search_view     = new Teambox.Views.Search({ app: this, el: $('search') });
    this.sidebar_view    = new Teambox.Views.Sidebar({ app: this, el: $('column') });
  }
});