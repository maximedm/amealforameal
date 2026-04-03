<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'info@toruspak.com'],
            [
                'name' => 'Torus Pak',
                'password' => bcrypt('toruspak'),
            ],
        );

        $articles = [
            [
                'title' => 'A Meal for a Meal is transforming a community',
                'slug' => 'a-meal-for-a-meal-is-transforming-a-community',
                'excerpt' => 'By providing meals to schoolchildren in impoverished communities, A Meal for a Meal supports more than just full bellies.',
                'body' => '<p>By providing meals to schoolchildren in impoverished communities, A Meal for a Meal supports more than just full bellies. Felix Lwanga, headmaster of the St. Charles Lwanga school in Africa, recently shared some lesser known benefits to providing meals to students, including improved morals, reduced illnesses and even new employment opportunities.</p>'
                    . '<p>When meals are distributed to students through A Meal for a Meal, positive impacts ripple through the entire community. Lwanga explained that discipline and concentration have greatly improved among the students at St. Charles Lwanga as a result of the meal programme.</p>'
                    . '<p>Learning has been accelerated since the children are better able to focus on their studies. With the assurance of breakfast and lunch, students don\'t have to worry about hunger dampening their attentiveness.</p>'
                    . '<p>Lwanga also shared that since the food programme was initiated in the school, there have been ethical improvements to the students\' behavior. The children often resorted to trespassing into a neighboring garden to steal fruit to eat prior to the implementation of the programme, but now they have the assurance of a meal provided at school.</p>'
                    . '<p>Stomach related illnesses have also dramatically decreased. Whereas before some pupils commonly carried containers of spoiled food to school, they now have access to fresh food.</p>'
                    . '<p>These benefits all overflow into the community by increasing the well-being, capacity and morality of the students, but there is also a more direct impact to the community. The Meal for a Meal programme has provided employment opportunities for people to cook and serve the meals to students.</p>'
                    . '<p>&ldquo;This leads to an improved standard of living among the community members involved in such activities,&rdquo; Lwanga said. &ldquo;The food programme is a real blessing to the school and the community as a whole.&rdquo;</p>'
                    . '<p>A Meal for a Meal is a global corporate social responsibility programme which provides meals to children in need. This initiative is supported by Romy Foods Corporation which is an international food network that is re-modelling the food chain by offering quality ready-made meals. Through frozen meals delivered in Torus Pak&reg; technology, Romy Foods&reg; has reduced food waste up to 90% and created a means of translating that waste into a meal for those in need: for every meal sold by the company, one is provided to an underprivileged child.</p>',
                'category' => 'Blog',
                'tags' => ['Uganda', 'Education', 'Africa'],
                'published_at' => '2019-11-27 00:00:00',
            ],
            [
                'title' => 'A Meal for A Meal reaches more school children in Uganda',
                'slug' => 'a-meal-for-a-meal-reaches-more-school-children-in-uganda',
                'excerpt' => 'Romy Foods has expanded its global food programme to yet another school in Uganda, providing meals to even more children in need.',
                'body' => '<p>Romy Foods&reg; has expanded its global food programme, &ldquo;A Meal for A Meal&rdquo; to yet another school in Uganda. Together with leading Maltese NGO, SOS Malta, the expanded initiative provides meals to even more children in need in the country\'s Masaka region.</p>'
                    . '<p>Since June 2016, A Meal for A Meal has been instrumental in providing more than 2000 meals a day to children attending two primary schools in the region of Jinja, in the Buikwe District of Uganda. Now, with a third school being added, the global food programme expects to cater over 2,000,000 meals to almost 2500 children by the end of 2019. This initiative not only provides nutritious meals: it provides a way for disadvantaged children up to 8 years old to attend elementary school.</p>'
                    . '<p>&ldquo;Romy Foods have recognized that the sustainable growth of their business depends on total commitment to the CSR objectives in the company\'s mission,&rdquo; said Claudia Taylor-East, CEO of SOS Malta. &ldquo;A Meal for a Meal is an integral part of their every day work. SOS Malta is honoured and proud to be part of this CSR initiative and continue securing a better world for the children in Uganda.&rdquo;</p>'
                    . '<p>&ldquo;After two very successful years, we are excited to have expanded our global food programme to a third school in Uganda,&rdquo; said Rickard Gillblad, Founder &amp; CEO, Romy Foods Corporation. &ldquo;We are fully committed to reducing world hunger. Through A Meal for A Meal, we now provide almost 2500 children with a meal every single day and we are working diligently to expand the programme to new locations.&rdquo;</p>'
                    . '<p>A Meal for a Meal is a global food programme that provides meals to children in need. This effort was launched, and is maintained by Romy Foods Corporation, an international food network with its headquarters in Malta, that has reinvented the food chain by offering high quality, ready-made meals that reduce typical food waste up to 90% using the patented Torus Pak&reg; technology. In turn, the savings created by the Romy Foods&reg; system translate into healthy, locally-sourced meals for Ugandan children in need.</p>',
                'category' => 'Blog',
                'tags' => ['Uganda', 'Africa', 'Malta', 'SDG'],
                'published_at' => '2019-03-11 00:00:00',
            ],
            [
                'title' => 'No Poverty',
                'slug' => 'no-poverty',
                'excerpt' => 'A free daily school meal directly impacts the chances of present and future generations to get out of the poverty cycle.',
                'body' => '<p>By allowing the poorest children to have a steady meal every school day, we contribute towards no poverty and zero hunger. Being able to study when suffering from hunger is a challenge.</p>'
                    . '<p>The quality of the education is not only based on the teacher\'s competence or the access to books, pens and paper, but in the children\'s ability to take in, process and absorb what they are taught. Our school meals are contributing towards quality education as a free meal every day is a vital part for them to be able to learn.</p>'
                    . '<p>We have learnt that female attendance rates have been low due to other priorities within poor families such as household chores like fetching water from far away. A robust warm meal available every day in school, has contributed to increased female attendance rates.</p>'
                    . '<p>Basic primary school education is necessary to be able to grow and compete on equal conditions. A Meal for A Meal is providing support towards a good start in life for those who need it the most, which reduces the gap between them and privileged children in the industrialised world.</p>'
                    . '<p>The partnership between Romy Foods and NGOs in relation to A Meal for A Meal programme is a perfect example of a partnership contributing towards the SDGs.</p>',
                'category' => 'Education',
                'tags' => ['SDG', 'Education', 'Hunger'],
                'published_at' => '2017-02-07 00:00:00',
            ],
            [
                'title' => 'Quality Education',
                'slug' => 'quality-education',
                'excerpt' => 'Being able to study when suffering from hunger is a challenge. Our school meals contribute towards quality education.',
                'body' => '<p>Being able to study when suffering from hunger is a challenge. The quality of the education is not only based on the teacher\'s competence or the access to books, pens and paper, but in the children\'s ability to take in, process and absorb what they are taught.</p>'
                    . '<p>Our school meals are contributing towards quality education as a free meal every day is a vital part for them to be able to learn.</p>'
                    . '<h2>Poverty and Hunger</h2><p>By allowing the poorest children to have a steady meal every school day, we contribute towards no poverty and zero hunger.</p>'
                    . '<h2>Gender Equality</h2><p>We have learnt that female attendance rates have been low due to other priorities within poor families such as household chores like fetching water from far away. A robust warm meal available every day in school, has contributed to increased female attendance rates.</p>'
                    . '<h2>Reduced Inequalities</h2><p>Basic primary school education is necessary to be able to grow and compete on equal conditions. A Meal for A Meal is providing support towards a good start in life for those who need it the most.</p>'
                    . '<h2>Partnerships for the Goals</h2><p>The partnership between Romy Foods and NGOs in relation to A Meal for A Meal programme is a perfect example of a partnership contributing towards the SDGs.</p>',
                'category' => 'Education',
                'tags' => ['SDG', 'Education', 'Africa'],
                'published_at' => '2017-02-07 01:00:00',
            ],
            [
                'title' => 'No Hunger',
                'slug' => 'no-hunger',
                'excerpt' => 'By allowing the poorest children to have a steady meal every school day, we can ensure they have their most basic needs met.',
                'body' => '<p>By allowing the poorest children to have a steady meal every school day, we can ensure they have their most basic needs met. A Meal for A Meal ensures that every child attending the schools we support receives a nutritious meal daily.</p>'
                    . '<p>Donations of locally sourced food help us bring nourishment and comfort to children throughout their school day. The programme ensures consistent access to meals, removing one of the biggest barriers to education and healthy development.</p>',
                'category' => 'Awareness',
                'tags' => ['Hunger', 'SDG', 'Africa'],
                'published_at' => '2017-02-07 02:00:00',
            ],
            [
                'title' => 'Gender Equality',
                'slug' => 'gender-equality',
                'excerpt' => 'Female attendance rates have increased thanks to the assurance of a daily warm meal at school.',
                'body' => '<p>We have learnt that female attendance rates have been low due to other priorities within poor families such as household chores like fetching water from far away. A robust warm meal available every day in school has contributed to increased female attendance rates.</p>'
                    . '<p>Annually in December, communities worldwide come together to support vulnerable populations, particularly children facing hunger and poverty. Through A Meal for A Meal, we ensure that girls have the same opportunity to attend school and receive an education.</p>'
                    . '<p>The programme provides food, support, and an experience that helps children feel valued and cared for. This has been transformative in communities where girls were previously kept from attending school.</p>',
                'category' => 'Awareness',
                'tags' => ['SDG', 'Education', 'Africa'],
                'published_at' => '2017-02-07 03:00:00',
            ],
            [
                'title' => 'Reduced Inequalities',
                'slug' => 'reduced-inequalities',
                'excerpt' => 'Basic primary school education is necessary to be able to grow and compete on equal conditions.',
                'body' => '<p>Basic primary school education is necessary to be able to grow and compete on equal conditions. A Meal for A Meal is providing support towards a good start in life for those who need it the most, which reduces the gap between them and privileged children in the industrialised world.</p>'
                    . '<p>By ensuring children have access to daily meals, we remove one of the key barriers that prevent disadvantaged children from accessing quality education and building a better future.</p>',
                'category' => 'Awareness',
                'tags' => ['SDG', 'Education', 'Africa'],
                'published_at' => '2017-02-07 04:00:00',
            ],
            [
                'title' => 'Partnerships for the Goals',
                'slug' => 'partnerships-for-the-goals',
                'excerpt' => 'The partnership between Romy Foods and NGOs is a perfect example of collaboration contributing towards the SDGs.',
                'body' => '<p>The partnership between Romy Foods and NGOs in relation to A Meal for A Meal programme is a perfect example of a partnership contributing towards the Sustainable Development Goals.</p>'
                    . '<p>Through collaboration with SOS Malta and other partners, we have been able to reach thousands of children across Uganda. This demonstrates how corporate social responsibility, when combined with experienced NGO implementation, can create lasting positive impact.</p>'
                    . '<p>Our students are surrounded by friendly, motivated peers with lots of talent. The programme develops caring, responsible human beings through access to education and nutrition.</p>',
                'category' => 'Blog',
                'tags' => ['SDG', 'Malta', 'Africa'],
                'published_at' => '2017-02-07 05:00:00',
            ],
        ];

        foreach ($articles as $data) {
            Article::firstOrCreate(
                ['slug' => $data['slug']],
                array_merge($data, ['user_id' => $user->id]),
            );
        }
    }
}
