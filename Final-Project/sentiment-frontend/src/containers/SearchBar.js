import React from 'react'
import './SearchBar.css'

class SearchBar extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
            phrase: '',
            stuff: ''
        }
    }

    doFetch = () => {
        fetch(`http://localhost:3000/phrases`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
                'Authorization': `Bear ${localStorage.token}`
            },
            body: JSON.stringify({
                phrase: this.state.phrase,
                user_id: localStorage.user_id
            }),
                
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                stuff: data
              })
        })
    }

    handleChange = (e) => {
        this.setState({
            phrase: e.target.value
        })
    }


    handleSubmit = (e) => {
        e.preventDefault()
        
        // console.log(e.target.children[1].value)
        this.setState({ 
            isLoaded: true
        },
        () => {
            console.log("HERE IS DATA:",this.state.phrase," Loaded?: ",this.state.isLoaded);
            this.doFetch()
        }
        )
        
    }




    render() {
        return (
            <div><br/>
                <form id="analyze-text" onSubmit={this.handleSubmit}>
                    <input type="text" className="input" placeholder="Enter Text" size="60" onChange={this.handleChange} />
                    <button className="submit" onClick={this.handleSubmit}>Analyze</button>
                    {(() => {
                        if (this.state.stuff.result === 'Positive') {
                            return (
                                <div>
                                    <h3 style={{color: '#282c34'}}>{this.state.phrase}</h3>
                                    <h3 style={{color: '#282c34'}}>Score: {this.state.stuff.score}</h3>
                                    <img src='data:image/png;base64,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' alt='happy place'/>
                                    <h3 style={{color: 'green'}}>Positive</h3><br/>
                                </div>
                            )
                        } else if (this.state.stuff.result === 'Negative') {
                            return (
                                <div>
                                    <h3 style={{color: '#282c34'}}>{this.state.phrase}</h3>
                                    <h3 style={{color: '#282c34'}}>Score: {this.state.stuff.score}</h3>
                                    <img src='data:image/png;base64,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' alt='sad place' />
                                    <h3 style={{color: 'red'}}>Negative</h3><br/>
                                </div>
                            )
                        } else if (this.state.stuff.result === 'Neutral') {
                            return (
                                <div>
                                    <h3 style={{color: '#282c34'}}>{this.state.phrase}</h3>
                                    <h3 style={{color: '#282c34'}}>Score: {this.state.stuff.score}</h3>
                                    <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAPkgAAD5IBBKh+oAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAiESURBVHic7ZxrcFRnGcd/z9nNJikXCaRlTMJFGhIkdAoBQksLhEQICYXUCxTsAM7gjJWxfHBs1alga/VLbXUcerFox1ZGrKAjEC7JMCQVCpRrJ2osAcFwlzsBAiTZPY8fksBuks3uuSRZIr+ZM3P2nPf8z7P/fd/3vOd5z1m4z32cIN1xUj2zcDCN3gwkkIkYGaj2ReiFalJTVHIFpQ6hFuUwahzGq9WS+ruTXR1rlxikx+YPRHxFiE4F8oBUm1KngApUywmwWdJXnXcvyvbpNIP0yPPxeK4UAwuBAsDr8in8IKXA7wn02yDDV9S7rA90gkH63wW9qAt8E/QFELs1xSrngXcw5Rcy/A/X3BR2zSCtyPWS9vnvgP4IGOCWrkUuorzK8MBbImsDbgi6YpAemjcOw3wbGO+GngtUYhhLJP3DXU6FHBmkOsfDIV2GsAwwnAbjMgqs4Eb/78m4lY12RWwbpEe+kkZAV6Myya5GF7Edw/N1yVx72s7BtgzSqllZYJQCaXaO7wbOokahjPprpdUDLRukVcUTUHMT3dcR2+UqYs6WrE07rBxkySCtnDkJoQxItBRa7HATw5wuo7bsjPaAqA3SypmjUHM7kGQrtNihFtOcItllUTW3qAzSysI0THMPkOIotJhBT6OaI9lbz0QqGdEgrcj10tdbDjF/tbLKdo72y5O5HQ8oI98f9fH8BNVJTcOKHsVkhl3+MbC8o0Id1iDdmzcRdAexNwh0CxODiTKuYk+4AmEN0jVzPAw5vx8Y3SmhxQrCQWoeygnX1MLXjMEXngcZ3eRhD15Ushl84bnw/rWDVk7vxa2GGiA5rIE9i4vc4gsy9aMbrXe0X4Nu+b8Nktztv27XLckksrg9K9rUIN1cGE//28foMWOeqDnN5YSHpWhLSGay7WU+qeFpEMfm/OOY8t4mP1XHTfr1EqaP97CowIMvzpluQyN8UBagbF+A2jola6jB4iIvjwxznNpKpf/tp4C/BG9sW4N25W9EdKaTM23Za7LsvUYCZuj2R4YJv/6ujwfi7enerIdvvdHIP/8TKuwx4GeLvRTkeGxG3IzKepm47engTSF9kH6SPxChwEl7Pn4OXn6/rTnQVKte/5PftvZrf/S3MQcgYMLy9/2cPI9tbRAQinR/bsiFKbSTNmUmDmcfVpb4aeggf7d+p8mpC9ZH5SfOKRt2hb8raGiE32zyW9ZtRRx+ozB4Q6hBolOd/AINfmHbwY5z5aaplO4NWNYu22eiEXzdut+k0Y/t+EFAJS+8QRi5TsSPnlbqo8j+VtWoZe2qmnbabCtuNyhHz2A7/qbFyA9xpGVF904fhJKGgt3l8rXoms6la2pZ+1KUs12Xaq1rt1oG6a68O/N5d/sbkxFNDtonzhvd8T4vWD2XL8oLVHxcS01wgHozgdMQ3MRMyXSmCinJ0d30p0ZZLkT7wei+dEqyQ3MADDLvrt7lYWdtV0hLNkgZEPnL54zwWtYenxm5CqUlCykDPI6+AwiYkt6OQZLksO2CwtemdDxUTuot5I/xWNadlh3H53p3XDvmTPE5jr85L3gn7x78c/dx7DzCs3k+0lPC16IXn0kgwWdY1k2MF16YG34IPjzVw7w8n+P4m5c+bQ1Seoc9uwV8cfDm0kS+ODjUpDiv8P35CczIsT8OnTkhjheficfbqrWNHOLhzaUJzZ2/K9wxKEjShc6tmYFJHlb9sDcfVfqpPumnT6JBfrY3qv4pEvPz4pn8qI9tBxq5cdtkxCAvUx714umkpPBdg1RuuJmY9wjkj/aSPzroN3BJPrW/sHCaL3Sjm3MKyvWW1eDor7tZi+5pDLkzLA0yyLjSHbHEJKZebVkN6qT1390STCwixpGW1eBOuhq938QAEK1uWQ261fBWt1v4/xFDDreshlQZ3TH7JOi98lBUZ3FCJpUMafnQavSgFV0dTQyyLfhDq7GnUYHqgq6MJgYpD/4QWoMMYxNg+4nQHkAjAS0N3tDmsqXbZ5eAPGVHXRVWV9xi92eN+ANd+7iM1yNMHOljfm4CYv9ivE4mr/9yiG6bImqsQtSWQaUH6nn9z3U2Y3POzqoGBvQVCsbanHhTXdV6U9tbvLr69aicQQWry79qHE+7OKaqxm857ublFMnxG1vrtTFIirbUo/KGnTzKyCEO55VdYNRQmzkhlZ9L1tqG1nrtZ1Dq694lodcPgAetBDdjbAKXr5ns/qwBvyuvkkSP1wNPZPmYNsZW8zpHb/9v29sRtjvT8uKliP7KztnuOYQlkrvhnfZ2hc/BXfS9xYBb3wDGdFJYscIBLiWuDLezwwuibi18DGQnPfkhTjEfky+V7gtXIOKIQcsKforIS+7GFSMor0hB6csdFYmc5t79+HIm7HwcIS9i2XsJ4W/U9ns1crEo0JK8VDyyB/tvK8capzC8OTKj7GykglEPynXD1CwMtgP9HYXW/dQSMCZL8ba/R1PY0l2LluQ+iZplwAO2Qut+bqI6XYp3uP86VAu67skJCBu5956hvoLBbJn18cdWDrJ136vrJo1EA6XAIDvHdwNnMQIzpHhPVM0qGNuJAV3/RAr+wGpgil2NLqICGp+Vrx6I2CG3h6NpDF0zx4McX0bTnwk4fAbXdRR4DR36UqR3wjrClXke/XBsNgZvo0xwQ88xwqeYukTmHfzEuZRL6Jo5HgJHn8PQ5SgPuaVrkXPAKxz69F15mchPfUaB6zOFujk9niuJixBZRte9V38O1V/S17dCZh246aZwp02l6ub0eC7HzwJjAWgh4HY2rQF0C8oq4imRuVVtkl1u0CVzzbo6I5mApwjIa35Q2+7w4ARQDlqO6mZZdOiSe1G2T7dMxusHGamodwQEMoAMxOgL9EG1X1NUchW4jmotqodRDuPRall02Nb/b9znPt3H/wC31PMbCZ+daAAAAABJRU5ErkJggg==' alt='Neutral Zone' />
                                    <h3 style={{color: 'yellow'}}>Neutral</h3><br/>
                                </div>
                            )
                        } else {
                            return (
                                null   
                            )
                        }
                    })()}
                </form>
            </div>
        )
    }

}

export default SearchBar 


            
