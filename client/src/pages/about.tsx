import '../index.css';
import aboutMeFoodBlog from '../images/about_me_food_blog.jpg';
import aboutMeFood1 from '../images/about-food1.jpg';
import React from 'react';


const About: React.FC = () => (
    <div>
        <div className="flex" style={{ justifyContent: 'center', columnGap: '5%', width: '90%', alignItems: 'center', marginTop: '10%', marginBottom: '7%' }}>
            <div className="flex" style={{ columnGap: '2%', alignItems: 'center', padding: '2%', border: '1px solid black', borderRadius: '6%' }}>
                <div>
                    <div><img src={aboutMeFood1} alt="Vegan food" style={{ width: '320px', borderRadius: '6%' }} /></div>

                </div>
                <div>
                    <img src={aboutMeFoodBlog} alt="About me" style={{ borderRadius: '6%', height: '360px' }} />
                </div>
            </div>
            <div style={{ width: '40%' }}>

                <h1 style={{ fontSize: '2.25rem', fontWeight: '700' }}>About me</h1>
                <p style={{ marginBottom: '5%' }}>
                    Welcome to VeggieVibes, your ultimate destination for delicious vegan recipes and tips! I'm [Your Name], the creator behind this culinary haven.   As a passionate advocate for cruelty-free living and sustainability,
                    I embarked on a mission to explore the vibrant world of plant-based cuisine.
                </p>
                <p>
                    Through experimentation in my kitchen and exploration of diverse ingredients, I discovered the endless possibilities and flavors that vegan food offers.
                    Driven by my love for cooking and desire to inspire others,
                    I decided to channel my creativity into this blog. Here, I aim to share my favorite recipes, cooking techniques, and insights into the vegan lifestyle. Whether you're a seasoned vegan, a curious foodie, or someone looking to incorporate more plant-based meals into your diet,
                    you'll find something delightful to explore here.
                </p>
            </div>
        </div>
        <div style={{ padding: '3%' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '700' }}>About This Blog</h1>
            <p>Welcome to VeggieVibes, where plant-based passion meets culinary creativity! At VeggieVibes, we're dedicated to showcasing the versatility, flavor, and joy of vegan cuisine.
                Our mission is simple: to make vegan cooking accessible, enjoyable, and downright delicious for everyone. Whether you're a seasoned vegan, a curious beginner, or simply someone looking to add more plant-based meals to your diet, you'll find a treasure trove of inspiration here.
                From hearty mains to decadent desserts, our recipes are crafted with care, using wholesome, plant-powered ingredients that nourish both body and soul. But our blog is more than just recipes.
                <br /><br />It's a celebration of mindful eating, sustainability, and the vibrant flavors of nature.
                We believe that food has the power to bring people together, ignite creativity, and nourish not only our bodies but also our planet. That's why we're committed to sharing not only delicious recipes but also practical tips, resources, and insights into the vegan lifestyle.
                So, whether you're here to explore new culinary horizons, embark on a journey to better health, or simply indulge in some mouthwatering vegan treats, we invite you to join us on this flavorful adventure. Together, let's discover the delicious world of plant-based cooking!
            </p>
        </div>


    </div>

)

export default About;
