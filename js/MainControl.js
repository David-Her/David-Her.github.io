function RemoteSwitchA() {
  var houseCode;
  var receiverCode;
  var repeats;
}

function MainControl() {
  this.pages = {};
  this.pages['welcome'] = new PageWelcome();
  this.pages['settings'] = new PageSettings();
  this.pages['new-remote'] = new PageNewRemote();

  $.cookie.json = true;
  var dikey = $.cookie("dikey");
  if( dikey !== undefined ) 
  {
    if ((typeof dikey == 'string') && (dikey.length == 5))
    {
      console.log("dikey valid")
      console.log(dikey)
    }
    else
    {
      console.log("dikey not valid")
    }    
  }
  else
  {
    console.log("no dikey")
  }
  
  this.currentPage = this.pages['welcome'];
  this.currentPage.enterKey = dikey;
  this.currentPage.start();
  

  
  this.brickMenuClick = function(name, ev) {
    $('.remote-can-be-active').each(function() {
      $(this).parent().removeClass('active');
    });
    
    if(this.currentPage !== undefined) {
      this.currentPage.stop();
    }

    if(this.pages[name] === undefined) {
      // TODO: This should not be possible, show error page?
      // this.pages[page] = ErrorPage();
    }

    this.currentPage = this.pages[name];
    $('#dashboard-header').empty();
    $('#dashboard-header').append(this.currentPage.name);

    $('#remote-page-' + name).parent().addClass('active');
    this.currentPage.start();
  };

  $('#remote-page-overview').click(this.brickMenuClick.bind(this, 'overview'));
  $('#remote-page-settings').click(this.brickMenuClick.bind(this, 'settings'));
  $('#remote-page-about').click(this.brickMenuClick.bind(this, 'about'));
  $('#remote-page-legal-info').click(this.brickMenuClick.bind(this, 'legal-info'));
  $('#remote-page-new-remote').click(this.brickMenuClick.bind(this, 'new-remote'));
  $('#dashboard-header').text(this.currentPage.name);
}

var mainControl =  new MainControl();
