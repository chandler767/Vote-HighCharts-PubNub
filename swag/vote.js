var voteChannel = "swag_votes"; // Channel for counting votes.

pubnub = new PubNub({ // Your PubNub keys here. Get them from https://dashboard.pubnub.com.
  publishKey : 'pub-c-5674176f-9af4-4ce4-b047-e2b0e1b5e8f2',
  subscribeKey : 'sub-c-5c77313a-3b30-11ea-9443-9e82b35d3d47'
});

function publishVote(swag) { // Publish a vote with PubNub.
    document.querySelectorAll('.className button').forEach(elem => {
      elem.disabled = true;
    });
    var publishConfig = {
        channel: voteChannel, 
        message: swag // Send the vote.
    };
    pubnub.publish(publishConfig, function(status, response) { // Publish message.
        console.log(status, response);
    });
    alert("Thanks for voting!");
    window.location = "https://www.pubnub.com/";
};
