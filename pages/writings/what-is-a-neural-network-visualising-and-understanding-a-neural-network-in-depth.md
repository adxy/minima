---
title: "What is a Neural Network? Visualising & Understanding a Neural Network In-depth."
date: 2023-07-02 00:20:28
published: true
math: true
---

In this article, we will discuss the history, current usage, and development of Neural Networks. We will try to understand each of the segments while visualizing them.

This article aims to introduce neural networks in a manner that will require little to no prerequisites from the reader about the topics.

## **Chapter 1: Introduction to Neural Networks**

### **Part 1: PERCEPTRONS**

#### **1.0 VISUALISING PERCEPTRON**

It all started in 1958 with the invention of **_Perceptron_**. It was an algorithm that was used to mimic the _biological neuron_. A perceptron was a type of **_Artificial Neuron._**

You might have seen the following figure in your school biology textbooks. So, what does it have to do with perceptron?!

*Let’s see how a* *perceptron* *relates to a* *biological neuron.*

![Perceptron Animation relation to biological neuron](https://cdn.hashnode.com/res/hashnode/image/upload/v1671022628036/8ZZPKZRdW.gif)

If you observe the above image you will notice quite some similarities between a biological neuron and an artificial neuron.

> _Both take some input from the left-hand side and then process the data(applying the logic) in the middle part of it and then produces an output._

Take a look at the above animation for 2-3 iterations and you will be able to understand it well enough.

_Although, in reality, artificial neurons are nothing like biological neurons, they are just inspired you can say._

#### **1.1 WORKING OF THE PERCEPTRON**

Now we know how a perceptron looks, let’s see how it works.

![Perceptron diagram with weights](https://cdn.hashnode.com/res/hashnode/image/upload/v1671022797625/xjSfjqQkW.jpg)

Perceptron accepts only binary input i.e., 1 or 0 and similarly, it also outputs in binary. So, if x1, x2, and x3 are input to a perceptron they all can be either a 1 or 0.

Do you see those w1, w2, and w3 in the image? Those are called **_“weights”_**, we will talk about them in a bit.

The perceptron works by taking the sum of inputs with the product of their respective weights and then comparing it to the **_threshold value_**, so the output is 0, 1 depending on whether the weighted sum( ∑wi.xi ) is greater or less than the threshold value. So, the output of the above figure will be determined by ∑wi.xi = **_“x1.w1 + x2.w2 + x3.w3”_** which is then compared to the threshold value to produce output.

Mathematically, it is easier to understand:

$$\sum_{i}w_i.x_i=x1w1+x2w2+x3w3$$

$$\text{output}= \begin{cases} \text{0 if }\sum\limits_i w_i.x_i \le\text{threshold} \cr\text{1 if }\sum\limits_i w_i.x_i >\text{threshold} \end{cases}$$

> _Now to understand perceptron we shall take an example, this example may not be a real application but it will help us understand perceptron easily._

Now, suppose you want to go to watch a football match this weekend in a stadium in your city. But the tickets are expensive. There are three conditions that determine whether you will go to watch the match or not:

**_x1:_** Do you have enough money to buy the ticket?

**_x2:_** Is your favourite team playing?

**_x3:_** Is the weather good?

If you were to feed these conditions into the perceptron they can only be 0 or 1.

So, let’s say **_you have enough money to buy the ticket_** you will set **_“x1 = 1”_** otherwise you will set **_“x1 = 0”_** and **_if your favourite team is playing_** set **_“x2 = 1”_** otherwise set “x2 = 0” and **_if the weather is good enough to go out_** set **_“x3 = 1”_** else set **_“x3 = 0”._**

Before, feeding these conditions in the perceptron we will also have to adjust **_“weights”_**.

So, what are “weights”? In simple words, **_weights_** are the _importance you give to your input conditions._

So, let’s say the most important condition for you to go watch the match is **_whether you have money to buy the ticket_**, because if you don’t have the money you cannot buy the ticket, so you will assign a greater value of weight to it, let’s say **_w1 = 5._**

Now, you also care about whether your **_favourite team is playing or not_**, so you assign a weight of **_w2 = 2_** to it.

But, you don’t care if **_the weather is good or bad_**, you are a big football fan and you will still go, so you assign a relatively small weight to that, let’s say **_w3 = 1_**.

Now, when you put this in equation 1 and equation 2, you will see if you don’t have the money the output will always be **_0_** even if _your favourite team is playing_ and the _weather is good_ (assuming the threshold to be 3.5)_._ This is because you have assigned the **_largest weight to w1._** And, if _you have the money to buy the tickets_ the perceptron will most probably **_output 1_**.

This is how weights are used in perceptron to set the importance or _weightage_ of any input. Also, just like weights, the **_threshold value is adjusted manually according to the need._**

As you have observed, the reason why the perceptron outputs only 0 or 1 is the threshold value which arises due to the usage of the **_step function._**

The **_step function_** is used in perceptron, you can see the step function diagrammatically below, and you should be able to understand how it works with perceptron.

![Graph of threshold of a perceptron](https://cdn.hashnode.com/res/hashnode/image/upload/v1671022958922/HRKBTrpa_.jpg)

**_As we can observe, due to_** **_step function_** **_as-soon-as the output is greater than the threshold value perceptron outputs 1 and for any value equal or less than the threshold, perceptron outputs 0._**

By using perceptrons we could build a network to solve any logic, which in turn made perceptrons another form of logic gates. _Why would we need another form of logic gates when we already had those_? This issue stalled the development and the funding of perceptrons.

![Using perceptron as logic gates](https://cdn.hashnode.com/res/hashnode/image/upload/v1671023135331/ZiWFap4y-.webp)

> _Using the step function resulted in the biggest drawback of the perceptrons. This issue never allowed perceptrons to learn by changing the weights during the execution._

Later on, we realised that other types of functions can be used in neurons, and that lead to the development of **_the Sigmoid Neuron._**

### **Part 2: MODERN NEURONS**

#### **2.0 DIFFERENCE BETWEEN MODERN NEURONS AND PERCEPTRONS**

Modern neurons are nothing but a slightly improved version of perceptrons, there are two major differences between any modern neuron and a perceptron:

- The output is any fractional value between 0 and 1 unlike perceptrons, which only have two outputs 0 or 1.
- We use various other **\*Activation Functions\*\*** instead of using _step function_ as in perceptron.
- A new term **\*bias\*\*\*** is added to the weighted sum and the **_threshold value is replaced by a 0._**

\*\*\*\*\*\*\*The functions used in neurons to implement the logic are called **_Activation Functions_** so _the step function is the activation function of the perceptron_ and _the sigmoid function is the activation function of the sigmoid neuron._

\*\*\*\*\*\*\*\*The threshold value in the equation(∑wi.xi ≥ threshold) is moved to the left of the equation and named “bias” (∑wi.xi + b ≥ 0).  
(b ≅ – threshold).

$$output = \begin{cases}0~if~\sum\limits_{i} w_{i}.x_{i} + b \ge 0 \\\1~if~\sum\limits_{i} w_{i}.x_{i} + b < 0\end{cases}$$

Also, we are setting a new variable **_“z”_** to our weighted sum of inputs + bias to make it better to use in formulas:

$$z = \sum_i w_{i}.x_{i}+b$$

#### **2.1 SIGMOID NEURONS**

We have discussed above how a modern neuron is different from a perceptron, now we will talk about how this modern neuron is working better using sigmoid or other activation functions.

We now know all the theory of how a sigmoid neuron is better than a perceptron but I think it’s all a waste until we visualise it, so let’s dive into how a sigmoid function works to understand how it makes a sigmoid neuron more viable than a perceptron.

![Sigmoid Neuron graph](https://cdn.hashnode.com/res/hashnode/image/upload/v1671023316024/nbxAPv15g.jpg)

The above figure shows you how a sigmoid function looks. Unlike, the step function sigmoid function has a much smoother slope.

If you observe Fig 2 above, on the left(marked with red), the sigmoid function(in blue) goes from 0 to 1. _Hence, for any input, it gives an output between 0 and 1._

Now, let’s try and understand this _mathematically._ The formula for the sigmoid function is given as:

$$sigmoid(z) = \sigma(z) = \frac{1}{1+e^{-z}}$$

We will discuss two cases to understand the sigmoid function.

- **_When the value of “z” is a very large number._**

$$\sigma(large~number) = \frac{1}{1+e^{-(large~number)}} =\frac{1}{1+0} = 1$$

- **_When the value of “z” is a very large_** **_NEGATIVE_** **_number._**

$$\sigma(large~negative~number) = \frac{1}{1+e^{-(large~negative~number)}} =\frac{1}{1+\infty} = 0$$

_The above two equations show that for very large or very small values the output of the sigmoid function is 1 and 0 respectively and for other values, the sigmoid function gives values between 1 and 0._

So, a sigmoid neuron will look something like this diagrammatically:

![Sigmoid diagram with weights](https://cdn.hashnode.com/res/hashnode/image/upload/v1671023545517/8cYjKGDyl.jpg)

It looks very similar to the perceptron we have seen above, just changing the activation function and outputs.

### **Part 3: NEURAL NETWORKS**

#### **3.0 WHAT IS AN ARTIFICIAL NEURAL NETWORK(ANN)**

After understanding Neurons we can take a look at what a Neural Network(NN) is, in simple words, we can say that:

> _An Artificial Neural Network is a network of artificial neurons._

When we interconnect two or more neurons with each other, that can be called a neural network.

![Simple Neural Network](https://cdn.hashnode.com/res/hashnode/image/upload/v1671023593900/wbhhWJWKw.jpg)

In the above figure, we can see a simple ANN, it consists of 2 layers(because we don’t count the input layer). The input layer gives input to the hidden layer, it’s called a hidden layer because it is neither input or an output layer, the output of the hidden layer is fed into the output layer which computes our final calculation.

If this is a bit tricky to understand don’t worry, we will discuss how an ANN works in detail in the next chapter.

_An ANN is also called simply a Neural Network._

#### **3.1 ARCHITECTURE OF A NEURAL NETWORK**

![Layers of an Artificial Neural Network ANN](https://cdn.hashnode.com/res/hashnode/image/upload/v1671023614332/MTa2mEES3.jpg)

The Neural Networks are designed to resemble the human brain, the ANNs are a simple model that is formed by joining the appropriate number of neurons in order to solve a classification problem or to find patterns in the data.

In the above figure, we can observe a 3-layer Neural Network. As we can observe there is one input layer, two hidden layers, and one output layer.

This is a three-layered Neural Network because we _never count the Input Layer_ to be a part of the Neural Network layers.

The hidden layers are called hidden just because they are neither the input layer nor the output layer. Or, we can say that the user doesn’t interact with the hidden layer directly and therefore it is called a hidden layer.

Any number of layers having any number of neurons can be used in any respective layer to achieve the desired goal. For example, the output layer can have two or more neurons instead of one for any different neural network.

This concludes the Introduction to Neural Networks, to read more about these topics follow some of the references below.

**_References:_**

- [**_Comprehensive Introduction to Neural Network Architecture_**](https://web.archive.org/web/20211008124809/https://towardsdatascience.com/comprehensive-introduction-to-neural-network-architecture-c08c6d8e5d98)
- [**_Neural Networks and Deep Learning online book by Michael Nielsen_**](https://web.archive.org/web/20211008124809/http://neuralnetworksanddeeplearning.com/)
