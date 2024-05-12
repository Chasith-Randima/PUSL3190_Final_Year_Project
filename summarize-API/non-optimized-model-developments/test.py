from transformers import PegasusForConditionalGeneration, PegasusTokenizer


tokenizer = PegasusTokenizer.from_pretrained("google/pegasus-xsum")
    # Load model
model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-xsum")

# Specify the directory where you want to save the model
model_save_directory = "./my_project_folder/pegasus_model"
print("workign...")
# Save the model and tokenizer
model.save_pretrained(model_save_directory)
tokenizer.save_pretrained(model_save_directory)