import json
import numpy as np
import dateutil.parser
from datetime import datetime
import seaborn as sns
from scipy import stats
import pandas as pd

def convert_times(time):
    if type(time) == str and time != 'NA' and time!='NaT':
        return dateutil.parser.isoparse(time)
    else:
        return np.nan


def csv_to_dataframe():
    # grab all trial data, turn the data into a dataframe
    df = pd.read_csv('trialdata.csv', header=None)
    df['rows'] = df[3].apply(lambda x:  json.loads(x))
    new_df = pd.DataFrame.from_records(df['rows'].values)
    # new_df = new_df.set_index(keys=['uniqueId', 'condition_order', 'internal_node_id', 'key_press', 'rt', 'stimulus'])
    new_df = new_df.set_index(keys=['subject', 'expStartTime', 'time_elapsed', 'rt', 'trial_index', 'internal_node_id'])
    new_df = new_df.reset_index()
    new_df['expStartTime_test'] = new_df['expStartTime'].apply(convert_times)
    new_df['final_start_date'] = new_df['expStartTime_test'].apply(lambda x: x.strftime("%m-%d-%Y, %H:%M:%S"))
    return new_df

df = csv_to_dataframe()
print(df)

df.to_csv('trialdata_clean.csv', index=False)

