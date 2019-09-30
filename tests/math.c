
const int SIZE = 15;
int data[SIZE];

int imported_func(int num);

int squarer(int num)
{
    return num * num;
}

int add(int num, int num2)
{
    return num + num2 + imported_func(3);
}

void addLinear(int value) { 
  for (int i=0; i<SIZE; i++) {
    data[i] = data[i] + value;
  }
}

int* getData() {
  return &data[0];
}