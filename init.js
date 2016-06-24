dal = require('./DB/dal')

dal.init_db('admin', 'admin', 'admin@admin.admin', function() {dal.disconnect(function() {})})
