import dotenv from 'dotenv';
import twilio from 'twilio';
dotenv.config();

const {
  SID: accountSid,
  KEY: TwilloAuthToken
} = process.env;

twilio(accountSid, TwilloAuthToken);
const { MessagingResponse } = twilio.twiml;
/**
 * @class WhatsappBot
 * @description class will implement bot functionality
 */
class WhatsappBot {
  /**
   * @memberof WhatsappBot
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */
  static async giffySearch(req, res, next) {
    const twiml = new MessagingResponse();
    const q = req.body.Body;
    const link='';
    try {
      function httpGetAsync(theUrl, callback)
{
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }

    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);
    return;
}

// callback for the top 8 GIFs of search
function tenorCallback_search(responsetext)
{
    // parse the json response
    var response_objects = JSON.parse(responsetext);

    top_10_gifs = response_objects["results"];

    // load the GIFs -- for our example we will load the first GIFs preview size (nanogif) and share size (tinygif)

    link= top_10_gifs[0]["media"][0]["tinygif"]["url"];
    return;
}
// function to call the search endpoint
function grab_data()
{
    // set the apikey and limit
    var apikey = "GKDXY9MWDFY";
    var lmt = 8;

    // test search term
    var search_term = q;

    // using default locale of en_US
    var search_url = "https://g.tenor.com/v1/search?q=" + search_term + "&key=" +
            apikey + "&limit=" + lmt;

    httpGetAsync(search_url,tenorCallback_search);
    return;
}
      grab_data();
      message.media(`${link}`);
      res.set('Content-Type', 'text/xml');
      return res.status(200).send(twiml.toString());
    } catch (error) {
      return next(error);
    }
  }
}
export default WhatsappBot;