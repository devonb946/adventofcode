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
        try:
            field_checklist.remove(field.split(':')[0])
        except ValueError:
            pass
        
    if (len(field_checklist) == 0):
            return True

    return False

data = read_data()

print(count_valid_passports(data))
