from transformers import PegasusForConditionalGeneration, PegasusTokenizer


import time

start_time = time.time()

# Specify the directory where you want to save the model
model_save_directory = "./my_project_folder/pegasus_model"



# Load the model and tokenizer from the directory
model = PegasusForConditionalGeneration.from_pretrained(model_save_directory)
tokenizer = PegasusTokenizer.from_pretrained(model_save_directory)

text = """
Shops and schools have been closed in the Russian city of Belgorod after bombardments that authorities there have blamed on Ukraine.

Belgorod governor Vyacheslav Gladkov said two people were killed - as voting continues in a general election Vladimir Putin is certain to win.

Air defence systems downed eight Ukrainian missiles, Mr Gladkov said.

Mr Putin accused Ukraine of trying to disrupt his bid for another six-year term.

Students in Belgorod - which is near the border with Ukraine - will not attend school on Monday and Tuesday, the governor said. While shopping centres in Belgorod will be closed on Sunday and Monday, Mr Gladkov added.


Mr Gladkov said one woman was killed in a car park while with her son, as they walked a dog. "Medics are fighting for her son's life," the governor added.

Images circulating on social media show a car park billowing with smoke and fire. Belgorod has been the target of several retaliatory strikes from Kyiv.

The Russian defence ministry confirmed that it had "inflicted losses" in the border areas of Ukraine and the Belgorod and Kursk regions.

Also on Saturday, the governor of the Samara region - some 850km (530 miles) southeast of Moscow - said Ukrainian drones targeted two oil refineries.

In a post on Telegram, Dmitry Azarov said one of the refineries, in Syzran, had been set alight but there were no casualties.


A Ukrainian source told Reuters Kyiv's SBU intelligence agency struck three Samara region Rosneft refineries - in Syzran, Novokuibyshevsk and Kuibyshevsk.

Kyiv has not commented about the attacks in Belgorod.

Rosenberg: Russia's stage-managed election
Putin: From Russia's KGB to a presidency defined by war
Russian arrests as ballot boxes targeted in Putin vote
The elections, which are described as neither free nor fair by critics, are set to see Mr Putin win six more years in office. The result is not in doubt as Mr Putin has no credible opponent.

Potential candidates who opposed Russia's invasion of Ukraine were barred from running. While Mr Putin's most vocal critic, Alexei Navalny, died suddenly in an Arctic prison last month.


Mr Navalny's spokespeople have accused the Kremlin of killing the politician. These suggestions have been vehemently denied by the Russian government.

His widow, Yulia Navalnaya, called on Kremlin opponents to go to polling stations en masse at noon on Sunday to protest against the election.

Despite these elections being skewed in Mr Putin's favour, voting on Friday was filled with acts of vandalism at polling stations.

Reuters A woman pours a liquid into a ballot box, during the Russian presidential election in Moscow, Russia, in this screen grab taken from a video recording of a screen showing CCTV footage, March 15, 2024Reuters
Officials said that there had been five incidents across Russia of dye being dropped into ballot boxes
Incidents of vandalism involved green dye being poured into ballot boxes, the boxes being set alight and fireworks being set off inside polling stations, state media reported.


"They try to scare us, but this is not a nation that can be intimidated," 68-year-old Elena Kirsanova told AFP.

On Saturday, the ruling United Russia party said it had endured a large-scale hacking attack on its website, as reported by AFP.

Voting is taking place in Russia over three days until Sunday, spanning several time zones. Polling stations opened in the Kamchatka Peninsula, Russia's easternmost region, at 08:00 local time on Friday (20:00 GMT on Thursday) and will finally close in the westernmost Kaliningrad exclave at 20:00 on Sunday.
"""
# text = """
# Sri Lanka is still negotiating the power purchase price with India’s Adani group Energy Minister Kanchana Wijesekera said, amid concerns about the government procurement without tender.

# Adani group had proposed to sell a unit of wind power at 9.7 US cents per kilo Watt hour.

# That is about 30 to 31 Sri Lanka rupees at our exchange rates,” Minister Wijesekera said. “During the evaluation it has been reduced further to below 30 rupees. That price also we have not yet agreed, the evaluation is still ongoing.”

# “We hope to conclude the evaluation very quickly.”

# The price will apply to plants in Mannar and Pooneryn which are coming as a single project.

# Minister Wijesekera told parliament a day earlier that a price of 27.65 rupees a unit (8.97 US cents) was being discussed.

# Minister Wijesekera said claims made that Adani had proposed to sell power at 50 rupees was not correct.

# There have been reports that Adani had proposed to sell power at 14 US cents or 50 rupees at an exchange rate of 360 rupees.

# Adani is expected to build 500 MW of wind plants in Sri Lanka’s Mannar and Pooneryn area which have strong winds.

# CEB already has a 100 Mw wind plant in Mannar which is giving a plant factor of around 45 percent delivering around 400 Giga Watt hours of energy.

# Due to high plant factor the levelized cost for a 20-year concession for a 100MW plant was calculated at 4.6 percent in a project offered to investors based on CEB’s already available wind data for Mannar according to published Board of Investment data for investors.

# Without a competitive tender, investors could demand higher per unit rates by reducing the plant factor in their proposal analysts say.

# A plant that can deliver 2000 Giga Watt hours (based on Mannar plant factor) has a difference in price of 20 million US dollars a year for each one US cents in a the price of a unit, industry analysts say.

# Meanwhile Minister Wijesekera said through a feed in tariff system – which is also non-competitive – the Ceylon Electricity Board has to pay 37 to 43 rupees a unit to private solar and wind developers who build plants below 10 Mega Watts at the moment.

# When Sri Lanka sought bids from investors in February 2023, local renewable firms had bid over 48 rupees a unit, Minister Wijesekera said.

# “They were bids of 60 rupees sometimes 56 rupees,” he said. “At the time there was instability, the financial situation and questions over the ability of the CEB to pay.”

# A renewable project in Siyambalanduwa had resulted in a bid of 8 US cents a unit, he said which was about 25 to 26 rupees a unit.

# “We plan to enter into agreements for projects between 26 to 30 rupees as quickly as possible,” Wijesekera said. “It takes at least two years for a project to connect to the grid.”

# Competitive tenders for 10 reneable plans was also in planned.

# """

# Create tokens - number representation of our text
tokens = tokenizer(text, truncation=True, padding="longest", return_tensors="pt")

# Input tokens
tokens


# Summarize
summary = model.generate(**tokens,min_length=200,max_length=400)


# Output summary tokens
summary[0]


# Decode summary
print(tokenizer.decode(summary[0]))


end_time = time.time()
execution_time = end_time - start_time

print("Execution time:", execution_time, "seconds")









