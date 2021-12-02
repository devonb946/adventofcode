import re

def read_data():
    f = open("sample.txt", "r")
    lines = f.readlines()

    all_passports, passport_data = [], []
    for line in lines:
        split_line = line.split()

        if (len(split_line) == 0):
            all_passports.append(passport_data)
            passport_data = []
        else:
            passport_data = passport_data + split_line

    # append the final passport data if the file didn't end with a newline
    if (len(passport_data) > 0):
        all_passports.append(passport_data)

    f.close()

    return all_passports

def count_valid_passports(data):
    valid_count = 0

    for passport in data:
        if (verify_passport(passport)):
            valid_count += 1

    return valid_count

def verify_passport(passport):
    field_checklist = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

    for field in passport:
        field_arr = field.split(':')

        if not verify_field(field_arr[0], field_arr[1]):
            return False

        try:
            field_checklist.remove(field_arr[0])
        except ValueError:
            pass
        
    if (len(field_checklist) == 0):
            return True

    return False

def verify_field(field, value):
    if (field == 'byr' and 1920 <= int(value) <= 2002):
        return True
    elif (field == 'iyr' and 2010 <= int(value) <= 2020):
        return True
    elif (field == 'eyr' and 2020 <= int(value) <= 2030):
        return True
    elif (field == 'hgt'):
        if (value.endswith('cm') and 150 <= int(value[:-2]) <= 193):
            return True
        elif (value.endswith('in') and 59 <= int(value[:-2]) <= 76):
            return True
    elif (field == 'hcl' and re.search('^#[0-9a-f]{6}$', value)):
        return True
    elif (field == 'ecl' and value in ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']):
        return True
    elif (field == 'pid' and re.search('^[0]*[0-9]{9}$', value)):
        return True
    elif (field == 'cid'):
        return True
    
    return False


data = read_data()
print(count_valid_passports(data))
