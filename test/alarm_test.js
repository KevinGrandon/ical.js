suite('ICAL.Alarm', function() {

  var icsData;

  testSupport.defineSample('alarm_multiple.ics', function(data) {
    icsData = data;
  });

  var subject;
  var alarmTests = [];
  var primaryItem;

  setup(function() {

    var root = new ICAL.Component(
      ICAL.parse(icsData)[1]
    );

    var alarms = root.getAllSubcomponents('valarm');

    alarms.forEach(function(item) {
      alarmTests.push(new ICAL.Event(item));      
    });
  });

  suite('creating an alarm', function() {
    setup(function() {
      subject = new ICAL.Alarm();
    });

    test('initial state', function() {
      assert.instanceOf(subject.component, ICAL.Component);
      assert.equal(subject.component.name, 'valarm');
    });
  });

  suite('roundtrip', function() {

    function testRoundtrip(testPrefix, props) {
      test(testPrefix + ' setters', function() {
        for (var key in props) {
          subject[key] = props[key];
          assert.equal(subject[key], props[key], key);
        }
      });
  
      test(testPrefix + ' to string', function() {
        var aComp = new ICAL.Component(ICAL.parse(icsData)[1]);
        var aEvent = new ICAL.Event(aComp);
  
        var bComp = new ICAL.Component(
          ICAL.parse(aComp.toString())[1]
        );
  
        var bEvent = new ICAL.Event(bComp);
        assert.equal(aEvent.toString(), bEvent.toString());
      });
    }

    testRoundtrip('relative alarm', {
      trigger: '-P2D',
      action: 'email',
      attendee: 'MAILTO:lightsof@kevin.com',
      summary: 'Omg summary',
      description: 'Omg description'
    });

    testRoundtrip('repeats', {
      trigger: new ICAL.Time({
        year: 2012,
        month: 1,
        day: 1
      }),
      action: 'audio',
      repeat: 5,
      DURATION: 'PT15M',
      summary: 'Omg summary',
      description: 'Omg description'
    });
  });
});
