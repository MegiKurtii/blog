
import recipes from '../images/recipes.jpg'
import '../index.css'; 
const Header = () => {
    return (
        <header>

            <div className="container" style={{
                backgroundImage: `url(${recipes})`, opacity: 0.65, height: '550px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',maxWidth:'2000px',marginBottom:'7%'
            }}>

            </div>


        </header>
    )
}
export default Header;
/*                      <span style={{ padding: '3%', marginRight: '5%', fontFamily: 'cursive' }}>
                <span style={{ fontSize:'larger' }}> VeggieVibes: </span>A Plant-Powered Kitchen
            </span>
            */