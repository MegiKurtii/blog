
import recipes from '../images/recipes.jpg'
import '../index.css'; // Import your styles
const Header = () => {
    return (
        <header>

            <div className="container" style={{
                backgroundImage: `url(${recipes})`, opacity: 0.65, height: '550px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'
            }}>

            </div>


        </header>
    )
}
export default Header;
/*           <h1 className="absolute z-10 left-1/2 -translate-x-1/2 border border-transparent p-1 bg-white bg-opacity-75 top-1/3 ">
                VeggieVibes: A Plant-Powered Kitchen
            </h1>
              
            */