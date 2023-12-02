fn main() {
    let input = include_str!("./input/part1-test.txt");
    println!("{:?}", part_one(input));
}


pub struct Score {
    pub color: String,
    pub values: Vec<isize>,
}
fn part_one(input: &str) -> isize {
    let test: Vec<_> = input
        .lines()
        .map(|line| {
            let result: Vec<_> = line.split(":").collect();

            let index = result.get(0).unwrap();
            let value = result.get(1).unwrap();

            let rounds = value.replace(";", ",");
            let rounds: Vec<_> = rounds.split(",").map(|x| {
                let result: Vec<&str> = x.trim().split_whitespace().collect();
                return result
        }).collect();
            println!("{:?}", index);
            println!("{:?}", rounds);

            // let numbers: Vec<_> = line.chars().filter_map(|sign| sign.to_digit(10)).collect();
            // let first_and_last: String = numbers.first().unwrap().to_string() + &numbers.last().unwrap().to_string();

            // return first_and_last.parse::<isize>().unwrap()
        }).collect();
        // .count();

    return 1
}

#[cfg(test)]
mod tests {
    use crate::part_one;

    #[test]
    fn day_one_part_one() {
        let test_input = include_str!("./input/part1-test.txt");

        let expected = 8;
        let result = part_one(test_input);
        assert_eq!(result, expected);
    }
}
