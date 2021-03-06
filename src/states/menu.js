class Menu extends Phaser.State {

  constructor() {
    super();
  }

  preload() {
    this.slickUI = this.game.plugins.add(Phaser.Plugin.SlickUI);
    this.slickUI.load('assets/ui/kenney/kenney.json');
  }

  create() {
    /*
    const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'MENU', {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);

    this.input.onDown.add(this.startGame, this);
    */

    // var textField = panel.add(new SlickUI.Element.TextField(10,58, panel.width - 20, 40, 7));
    // textField.events.onOK.add(function () {
    //     alert('Your name is: ' + textField.value);
    // });
    // textField.events.onToggle.add(function (open) {
    //     console.log('You just ' + (open ? 'opened' : 'closed') + ' the virtual keyboard');
    // });
    // textField.events.onKeyPress.add(function(key) {
    //     console.log('You pressed: ' + key);
    // });



    this.game.add.sprite(0,-125,'backdrop');
    var panel;
    this.slickUI.add(panel = new SlickUI.Element.Panel(8, 8, this.game.width - 16, this.game.height - 16));
    panel.add(new SlickUI.Element.Text(10,10, "Pacman")).centerHorizontally().text.alpha = 0.5;
    panel.add(new SlickUI.Element.Text(12,34*3, "What is your name?"));
    panel.add(new SlickUI.Element.Text(14,34, "Server IP?"));
    var serverIP = panel.add(new SlickUI.Element.TextField(10,58, panel.width - 20, 40, 20));
    serverIP.value = 'localhost'
    serverIP.init()
    var username = panel.add(new SlickUI.Element.TextField(10,130, panel.width - 20, 40, 10));
    username.events.onOK.add(function () {
        alert('Your name is: ' + username.value);
    });
    username.events.onToggle.add(function (open) {
        console.log('You just ' + (open ? 'opened' : 'closed') + ' the virtual keyboard');
    });
    username.events.onKeyPress.add(function(key) {
        console.log('You pressed: ' + key);
    });
    var button;
    panel.add(button = new SlickUI.Element.Button(this.game.width/2 - 140/2,this.game.height/2 - 80/2 - 8, 140, 80));
    var globalThis = this

    var cookies = {};
    document.cookie.split('; ').forEach(function (param) {
      var val = param.split('='); cookies[val[0]] = val[1]
    })
    if (cookies.testMode == true) globalThis.startGame({username: 'test', serverIP: 'localhost'})

    button.events.onInputUp.add(function () {
      console.log('Clicked button');
      var re = /^\w+$/
      if (re.exec(username.value)) globalThis.startGame({username: username.value, serverIP: serverIP.value});
      else alert('Incorrect username');
    });
    button.add(new SlickUI.Element.Text(0,0, "Play")).center();
  }

  update() {}

  startGame (args) {
    this.game.state.start('game', true, false, args);
  }

}

export default Menu;
