import csv
import datetime
import json
import os
import time
import uuid
from random import randrange, random

from faker import Faker

fake = Faker()

DATA_FILE_PATH = os.path.dirname(__file__)

USER_DATA_COL_IDX = {
    "USER_ID_START_IDX": {"index": 0, "name": "id"},
    "PERSONALITY_START_IDX": {"index": 1, "name": "personality_scores"},
    "AUDIO_FEATURE_START_IDX ": {"index": 48, "name": "average_audio_features"},
    "CLUSTER_START_IDX": {"index": 57, "name": "cluster_assignment"},
    "USER_NAME_START_IDX": {"index": 58, "name": "name"},
    "USER_POST_START_IDX": {"index": 59, "name": "inferred_from_post"},
    "TRACK_START_IDX": {"index": 60, "name": "inferred_from_track"},
    "END": {"index": 61, "name": "end"},
}


class UserGenerator:
    table_name = "User"

    @staticmethod
    def generate():
        result = None
        with open(f"{DATA_FILE_PATH}/user.csv", newline="") as user_data:
            reader = csv.reader(user_data, delimiter=",")
            dataframe = []
            for row in reader:
                dataframe.append(UserGenerator.parse_user_row(row))
            col_names = dataframe[0]
            result = list(
                map(
                    lambda record: UserGenerator.construct_user_data(record, col_names),
                    dataframe[1:],
                )
            )
            inference_result = list(
                map(
                    lambda record: {
                        "user_id": record["user_id"],
                        "cluster_group": str(
                            record["insights"]["cluster_assignment"]["closest_cluster"]
                        ),
                    },
                    result,
                )
            )
            with open(f"{DATA_FILE_PATH}/user.json", "w", encoding="utf-8") as f:
                json.dump(result, f, indent=4, ensure_ascii=False)
            with open(f"{DATA_FILE_PATH}/inference.json", "w", encoding="utf-8") as f:
                json.dump(inference_result, f, indent=4, ensure_ascii=False)
        return result

    @staticmethod
    def parse_user_row(user_row):
        """
        Helper function to parse user rows
        """
        for index, record in enumerate(user_row):
            try:
                user_row[index] = float(record)
            except ValueError:
                continue
        prev_index = None
        prev_name = None
        parsed_data = {}
        for index_key in USER_DATA_COL_IDX:
            current_index = USER_DATA_COL_IDX[index_key]["index"]
            current_name = USER_DATA_COL_IDX[index_key]["name"]
            if prev_index is not None and prev_name is not None:
                data = user_row[prev_index:current_index]
                parsed_data[prev_name] = data if len(data) > 1 else data[0]
            prev_index = current_index
            prev_name = current_name
        return parsed_data

    @staticmethod
    def construct_user_data(user_data, column_reference):
        """
        Helper function to construct fake user data
        """

        def generate_time():
            """
            Helper function to generate timestamp
            """
            return int(
                time.mktime(
                    (
                        datetime.datetime.now()
                        + datetime.timedelta(
                            days=-1 * randrange(90),
                            hours=randrange(24),
                            minutes=randrange(60),
                        )
                    ).timetuple()
                )
            )

        def generate_id():
            """
            Helper function to generat ID
            """
            return str(uuid.uuid4())

        def generate_dict(field_name):
            """
            Helper function to transform list data to dictionary
            """
            return {
                key: value
                for key, value in zip(
                    column_reference[field_name], user_data[field_name]
                )
            }

        def generate_post(user_post, chunk_size=50):
            """
            Helper function to generate user post
            """
            user_posts = []
            user_post_split = user_post.split(" ")
            chunk = user_post_split[:chunk_size]
            rest = user_post_split[chunk_size:]
            while chunk != []:
                user_posts.append(
                    {
                        "message": " ".join(chunk) + "...",
                        "id": generate_id(),
                        "time": generate_time(),
                        "provider": "twitter",
                    }
                )
                chunk = rest[:chunk_size]
                rest = rest[chunk_size:]
            return sorted(user_posts, key=lambda value: value["time"])

        return {
            "created_at": generate_time(),
            "insights": {
                "inferred_from_post": generate_post(user_data["inferred_from_post"]),
                "personality_scores": generate_dict("personality_scores"),
                "inferred_from_track": user_data["inferred_from_track"].split(","),
                "average_audio_features": generate_dict("average_audio_features"),
                "cluster_assignment": {
                    "distance_to_cluster": random() * 5,
                    "closest_cluster": user_data["cluster_assignment"],
                },
            },
            "provider": {"twitter": {"name": user_data["name"], "id": user_data["id"]}},
            "user_id": generate_id(),
            "profile": {"user_name": fake.name(), "short_bio": fake.sentence()},
            "sid": generate_id(),
        }


if __name__ == "__main__":
    UserGenerator.generate()
