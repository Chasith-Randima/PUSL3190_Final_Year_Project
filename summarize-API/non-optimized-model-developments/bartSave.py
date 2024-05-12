# from transformers import PegasusForConditionalGeneration, PegasusTokenizer


# Specify the directory where you want to save the model
model_save_directory = "./models/bart-large-cnn"
print("workign...")


# tokenizer = PegasusTokenizer.from_pretrained(model_save_directory)
#     # Load model
# model = PegasusForConditionalGeneration.from_pretrained(model_save_directory)



from transformers import BartTokenizer, BartForConditionalGeneration
import torch

import time

# Record the start time
start_time = time.time()


# long_text = "This is a very very long text. " * 300
long_text = "I'am Randima Silva.This is sent from Postman to test the route.And whether the summarization algorithm along with flask api really work...is it working..?"

# long_text = text

model = BartForConditionalGeneration.from_pretrained(model_save_directory)
tokenizer = BartTokenizer.from_pretrained(model_save_directory)


# Save the model and tokenizer
# model.save_pretrained(model_save_directory)
# tokenizer.save_pretrained(model_save_directory)

# tokenize without truncation
inputs_no_trunc = tokenizer(long_text, max_length=None, return_tensors='pt', truncation=False)

# get batches of tokens corresponding to the exact model_max_length
chunk_start = 0
chunk_end = tokenizer.model_max_length  # == 1024 for Bart
inputs_batch_lst = []
while chunk_start <= len(inputs_no_trunc['input_ids'][0]):
    inputs_batch = inputs_no_trunc['input_ids'][0][chunk_start:chunk_end]  # get batch of n tokens
    inputs_batch = torch.unsqueeze(inputs_batch, 0)
    inputs_batch_lst.append(inputs_batch)
    chunk_start += tokenizer.model_max_length  # == 1024 for Bart
    chunk_end += tokenizer.model_max_length  # == 1024 for Bart

# generate a summary on each batch
summary_ids_lst = [model.generate(inputs, num_beams=4, max_length=100, early_stopping=True) for inputs in inputs_batch_lst]

# decode the output and join into one string with one paragraph per summary batch
summary_batch_lst = []
for summary_id in summary_ids_lst:
    summary_batch = [tokenizer.decode(g, skip_special_tokens=True, clean_up_tokenization_spaces=False) for g in summary_id]
    summary_batch_lst.append(summary_batch[0])
summary_all = '\n'.join(summary_batch_lst)

# Record the end time
end_time = time.time()

# Calculate the execution time
execution_time = end_time - start_time
print(f"Execution time: {execution_time} seconds")

print(summary_all)
