fn main() {
    let input = include_str!("./input/input.txt");
    println!("{:?}", part_one(input));
}

fn part_one(input: &str) -> isize {
    return input
        .split_whitespace()
        .map(|line| {
            let numbers: Vec<_> = line.chars().filter_map(|sign| sign.to_digit(10)).collect();
            let first_and_last: String = numbers.first().unwrap().to_string() + &numbers.last().unwrap().to_string();

            return first_and_last.parse::<isize>().unwrap()
        })
        .sum();
}

#[cfg(test)]
mod tests {
    use crate::part_one;

    #[test]
    fn day_one_part_one() {
        let test_input = include_str!("./input/part1-test.txt");

        let expected = 142;
        let result = part_one(test_input);
        assert_eq!(result, expected);
    }
}
