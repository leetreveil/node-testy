if (module == require.main) {

  var spawn = require('child_process').spawn,
      path  = require('path');
    
  var tests = ['test-fail.js', 'test-multinstance.js',
               'test-namedtest.js', 'test-simple.js'];
               
  for (var i=0; i < tests.length; i++) {
    var test = tests[i];
    var testProcess = spawn(process.execPath, [path.join(__dirname, test)]);
    
    testProcess.stdout.on('data', function(data) {
      process.stdout.write(data.toString());
    });
    
    testProcess.stderr.on('data', function(data) {
      process.stderr.write(data.toString());
    }); 
  }
}